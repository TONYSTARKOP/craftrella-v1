import {
  Typography,
  Input,
  Button,
  List,
  Card,
  Upload,
  message,
  Spin,
} from 'antd'
import { useState, useEffect, useRef } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ChatPage() {
  const { user } = useUserContext()
  const { organizationId } = useParams()
  const [selectedConversation, setSelectedConversation] = useState<string>('')
  const [messageContent, setMessageContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch conversations
  const { data: conversations, isLoading: loadingConversations } =
    Api.chatConversation.findMany.useQuery({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        messages: {
          include: {
            participant: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

  // Create new message mutation
  const { mutateAsync: createMessage } = Api.chatMessage.create.useMutation()

  // Socket subscription for real-time messages
  const { emit } = SocketClient.useEvent('new-message', payload => {
    if (payload.conversationId === selectedConversation) {
      refetchMessages()
    }
  })

  // Fetch messages for selected conversation
  const {
    data: messages,
    isLoading: loadingMessages,
    refetch: refetchMessages,
  } = Api.chatMessage.findMany.useQuery(
    {
      where: { conversationId: selectedConversation },
      include: {
        participant: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    },
    { enabled: !!selectedConversation },
  )

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !selectedConversation) return

    const conversation = conversations?.find(c => c.id === selectedConversation)
    const participant = conversation?.participants.find(
      p => p.userId === user?.id,
    )

    if (!participant) return

    await createMessage({
      data: {
        content: messageContent,
        conversationId: selectedConversation,
        participantId: participant.id,
      },
    })

    // Notify other participants
    const otherParticipants =
      conversation?.participants
        .filter(p => p.userId !== user?.id)
        .map(p => p.userId) || []

    emit({
      payload: { conversationId: selectedConversation },
      userIds: otherParticipants,
    })

    setMessageContent('')
    refetchMessages()
  }

  const handleImageUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      setMessageContent(prev => prev + `\n[Image](${url})`)
    } catch (error) {
      message.error('Failed to upload image')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>
          <i className="las la-comments"></i> Chat Messages
        </Title>
        <Text type="secondary">
          Communicate with sellers and customers in real-time
        </Text>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
            height: 'calc(100vh - 200px)',
          }}
        >
          {/* Conversations List */}
          <Card style={{ width: '300px', overflow: 'auto' }}>
            <List
              loading={loadingConversations}
              dataSource={conversations}
              renderItem={conversation => (
                <List.Item
                  onClick={() => setSelectedConversation(conversation.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      selectedConversation === conversation.id
                        ? '#f0f0f0'
                        : 'transparent',
                  }}
                >
                  <List.Item.Meta
                    title={conversation.participants
                      ?.filter(p => p.userId !== user?.id)
                      .map(p => p.user?.name)
                      .join(', ')}
                    description={`${
                      conversation.messages?.length || 0
                    } messages`}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Messages Area */}
          <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                <div
                  style={{ flex: 1, overflow: 'auto', marginBottom: '20px' }}
                >
                  {loadingMessages ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <Spin />
                    </div>
                  ) : (
                    messages?.map(message => (
                      <div
                        key={message.id}
                        style={{
                          marginBottom: '10px',
                          textAlign:
                            message.participant.userId === user?.id
                              ? 'right'
                              : 'left',
                        }}
                      >
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {message.participant.user.name} -{' '}
                          {dayjs(message.createdAt).format('HH:mm')}
                        </Text>
                        <Card
                          size="small"
                          style={{
                            display: 'inline-block',
                            maxWidth: '70%',
                            backgroundColor:
                              message.participant.userId === user?.id
                                ? '#e6f7ff'
                                : '#f0f0f0',
                          }}
                        >
                          <Text>{message.content}</Text>
                        </Card>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Upload
                    beforeUpload={file => {
                      handleImageUpload(file)
                      return false
                    }}
                    showUploadList={false}
                  >
                    <Button icon={<i className="las la-image" />} />
                  </Upload>
                  <TextArea
                    value={messageContent}
                    onChange={e => setMessageContent(e.target.value)}
                    onPressEnter={e => {
                      if (!e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type your message..."
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    style={{ flex: 1 }}
                  />
                  <Button
                    type="primary"
                    onClick={handleSendMessage}
                    icon={<i className="las la-paper-plane" />}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Text type="secondary">
                  Select a conversation to start chatting
                </Text>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
