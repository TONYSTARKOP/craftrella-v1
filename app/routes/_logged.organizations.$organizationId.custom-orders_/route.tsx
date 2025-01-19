import {
  Typography,
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  List,
  Tag,
  Modal,
  InputNumber,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomOrdersPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string>('')
  const [form] = Form.useForm()
  const [bidForm] = Form.useForm()

  // Fetch custom orders with user and bid information
  const { data: customOrders, refetch } = Api.customOrder.findMany.useQuery({
    where: { organizationId },
    include: { user: true, bids: { include: { user: true } } },
  })

  // Mutations
  const { mutateAsync: createCustomOrder } =
    Api.customOrder.create.useMutation()
  const { mutateAsync: createBid } = Api.bid.create.useMutation()

  const handleCreateOrder = async (values: any) => {
    try {
      await createCustomOrder({
        data: {
          description: values.description,
          deadline: values.deadline.format('YYYY-MM-DD'),
          status: 'OPEN',
          organizationId: organizationId!,
          userId: user!.id,
        },
      })
      setIsCreateModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Error creating custom order:', error)
    }
  }

  const handleCreateBid = async (values: any) => {
    try {
      await createBid({
        data: {
          price: values.price.toString(),
          timeline: values.timeline,
          status: 'PENDING',
          customOrderId: selectedOrder,
          userId: user!.id,
        },
      })
      setIsBidModalOpen(false)
      bidForm.resetFields()
      refetch()
    } catch (error) {
      console.error('Error creating bid:', error)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={2}>
            <i className="las la-clipboard-list"></i> Custom Orders
          </Title>
          <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
            <i className="las la-plus"></i> Create Custom Order
          </Button>
        </div>

        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={customOrders}
          renderItem={order => (
            <List.Item>
              <Card
                title={
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <i className="las la-shopping-bag"></i>
                    <Text strong>Custom Order</Text>
                    <Tag color={order.status === 'OPEN' ? 'green' : 'orange'}>
                      {order.status}
                    </Tag>
                  </div>
                }
              >
                <Text strong>Customer: </Text>
                <Text>{order.user?.name}</Text>
                <br />
                <Text strong>Description: </Text>
                <Text>{order.description}</Text>
                <br />
                <Text strong>Deadline: </Text>
                <Text>{dayjs(order.deadline).format('MMMM D, YYYY')}</Text>

                <div style={{ marginTop: 16 }}>
                  <Text strong>Bids ({order.bids?.length || 0})</Text>
                  <List
                    size="small"
                    dataSource={order.bids}
                    renderItem={bid => (
                      <List.Item>
                        <Text>
                          {bid.user?.name}: ${bid.price} - {bid.timeline}
                        </Text>
                      </List.Item>
                    )}
                  />

                  {order.userId !== user?.id && (
                    <Button
                      type="primary"
                      style={{ marginTop: 8 }}
                      onClick={() => {
                        setSelectedOrder(order.id)
                        setIsBidModalOpen(true)
                      }}
                    >
                      <i className="las la-gavel"></i> Submit Bid
                    </Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />

        {/* Create Custom Order Modal */}
        <Modal
          title="Create Custom Order"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateOrder} layout="vertical">
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please enter a description' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[{ required: true, message: 'Please select a deadline' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Order
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Submit Bid Modal */}
        <Modal
          title="Submit Bid"
          open={isBidModalOpen}
          onCancel={() => setIsBidModalOpen(false)}
          footer={null}
        >
          <Form form={bidForm} onFinish={handleCreateBid} layout="vertical">
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true, message: 'Please enter a price' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item
              name="timeline"
              label="Timeline"
              rules={[{ required: true, message: 'Please enter a timeline' }]}
            >
              <Input placeholder="e.g., 5 business days" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Bid
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
