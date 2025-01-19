import {
  Typography,
  Button,
  Card,
  Row,
  Col,
  Input,
  InputNumber,
  message,
  Modal,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductDetailsPage() {
  const { organizationId, productId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [quantity, setQuantity] = useState<number>(1)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  // Fetch product details with seller information
  const { data: product, isLoading } = Api.product.findFirst.useQuery({
    where: { id: productId },
    include: { user: true },
  })

  // Create chat conversation mutation
  const { mutateAsync: createConversation } =
    Api.chatConversation.create.useMutation()
  const { mutateAsync: createMessage } = Api.chatMessage.create.useMutation()
  const { mutateAsync: createParticipant } =
    Api.chatParticipant.create.useMutation()

  // Create order mutation
  const { mutateAsync: createOrder } = Api.order.create.useMutation()
  const { mutateAsync: createOrderItem } = Api.orderItem.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()

  const handlePurchase = async () => {
    try {
      if (!product || !user) return

      // Create order
      const order = await createOrder({
        data: {
          status: 'PENDING',
          total: (parseFloat(product.price) * quantity).toString(),
          type: 'PURCHASE',
          organizationId,
          userId: user.id,
        },
      })

      // Create order item
      await createOrderItem({
        data: {
          quantity,
          price: product.price,
          orderId: order.id,
          productId: product.id,
        },
      })

      // Update product quantity
      await updateProduct({
        where: { id: product.id },
        data: { quantity: product.quantity - quantity },
      })

      message.success('Purchase successful!')
      navigate(`/organizations/${organizationId}/customer-dashboard`)
    } catch (error) {
      message.error('Failed to process purchase')
    }
  }

  const handleChat = async () => {
    try {
      if (!product?.user || !user) return

      // Create conversation
      const conversation = await createConversation({ data: {} })

      // Create participants
      const buyerParticipant = await createParticipant({
        data: { userId: user.id, conversationId: conversation.id },
      })
      await createParticipant({
        data: { userId: product.user.id, conversationId: conversation.id },
      })

      // Send initial message
      await createMessage({
        data: {
          content: chatMessage,
          conversationId: conversation.id,
          participantId: buyerParticipant.id,
        },
      })

      message.success('Message sent to seller')
      setIsChatModalOpen(false)
      setChatMessage('')
    } catch (error) {
      message.error('Failed to start chat')
    }
  }

  if (isLoading || !product) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Product Details</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card>
              {product.pictureUrl && (
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <Title level={3}>{product.name}</Title>
              <Paragraph>{product.description}</Paragraph>
              <Text strong>Price: ${product.price}</Text>
              <br />
              <Text>Size: {product.size}</Text>
              <br />
              <Text>Category: {product.category}</Text>
              <br />
              <Text>Available Quantity: {product.quantity.toString()}</Text>
              <br />
              <Text>Seller: {product.user?.name}</Text>
              <div style={{ marginTop: 24 }}>
                <InputNumber
                  min={1}
                  max={product.quantity}
                  value={quantity}
                  onChange={value => setQuantity(value || 1)}
                  style={{ marginRight: 16 }}
                />
                <Button
                  type="primary"
                  onClick={handlePurchase}
                  icon={<i className="las la-shopping-cart" />}
                  style={{ marginRight: 16 }}
                >
                  Purchase
                </Button>
                <Button
                  onClick={() => setIsChatModalOpen(true)}
                  icon={<i className="las la-comments" />}
                >
                  Chat with Seller
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Message Seller"
          open={isChatModalOpen}
          onOk={handleChat}
          onCancel={() => setIsChatModalOpen(false)}
        >
          <Input.TextArea
            value={chatMessage}
            onChange={e => setChatMessage(e.target.value)}
            placeholder="Type your message..."
            rows={4}
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
