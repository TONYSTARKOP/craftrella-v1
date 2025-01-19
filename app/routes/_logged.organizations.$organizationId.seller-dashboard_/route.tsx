import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Statistic,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
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

export default function SellerDashboardPage() {
  const { organization } = useUserContext()
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch products
  const { data: products, refetch: refetchProducts } =
    Api.product.findMany.useQuery({
      where: { organizationId },
      include: { orderItems: true },
    })

  // Fetch orders
  const { data: orders } = Api.order.findMany.useQuery({
    where: { organizationId },
    include: { orderItems: { include: { product: true } } },
  })

  // Fetch custom orders
  const { data: customOrders } = Api.customOrder.findMany.useQuery({
    where: { organizationId },
    include: { bids: true },
  })

  // Mutations
  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()

  // Calculate analytics
  const totalSales =
    orders?.reduce((acc, order) => acc + parseFloat(order.total), 0) || 0
  const totalOrders = orders?.length || 0
  const activeCustomOrders =
    customOrders?.filter(order => order.status === 'ACTIVE').length || 0

  const handleAddProduct = async (values: any) => {
    await createProduct({
      data: {
        ...values,
        organizationId,
        userId: organization?.roles[0]?.userId || '',
        status: 'ACTIVE',
      },
    })
    setIsProductModalVisible(false)
    form.resetFields()
    refetchProducts()
  }

  const productColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            onClick={() =>
              navigate(`/organizations/${organizationId}/products/${record.id}`)
            }
          >
            <i className="las la-edit"></i> Edit
          </Button>
        </Space>
      ),
    },
  ]

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text copyable>{id.slice(0, 8)}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'COMPLETED' ? 'green' : 'processing'}>
          {status}
        </Tag>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-store"></i> Seller Dashboard
        </Title>
        <Text type="secondary">
          Manage your products, track orders, and view analytics
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Sales"
                value={totalSales}
                prefix="$"
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<i className="las la-dollar-sign"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Orders"
                value={totalOrders}
                valueStyle={{ color: '#1890ff' }}
                prefix={<i className="las la-shopping-cart"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Custom Orders"
                value={activeCustomOrders}
                valueStyle={{ color: '#722ed1' }}
                prefix={<i className="las la-clipboard-list"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <Title level={4}>
              <i className="las la-box"></i> Product Listings
            </Title>
            <Button
              type="primary"
              onClick={() => setIsProductModalVisible(true)}
            >
              <i className="las la-plus"></i> Add Product
            </Button>
          </div>
          <Table
            columns={productColumns}
            dataSource={products}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Card>

        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>
            <i className="las la-shopping-bag"></i> Recent Orders
          </Title>
          <Table
            columns={orderColumns}
            dataSource={orders}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Card>
      </div>

      <Modal
        title="Add New Product"
        visible={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddProduct} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input prefix="$" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="clothing">Clothing</Select.Option>
              <Select.Option value="books">Books</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
