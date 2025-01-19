import { Typography, Card, Row, Col, Table, Tag, Space } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerDashboardPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()

  // Fetch active orders
  const { data: orders } = Api.order.findMany.useQuery({
    where: {
      userId: user?.id,
      organizationId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  // Fetch custom orders and bids
  const { data: customOrders } = Api.customOrder.findMany.useQuery({
    where: {
      userId: user?.id,
      organizationId,
    },
    include: {
      bids: true,
    },
  })

  // Fetch donations
  const { data: donations } = Api.donation.findMany.useQuery({
    where: {
      userId: user?.id,
      organizationId,
    },
  })

  // Calculate total kindness points
  const totalKindnessPoints =
    donations?.reduce((acc, donation) => acc + donation.kindnessPoints, 0) || 0

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text copyable>{text.slice(0, 8)}</Text>,
    },
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
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: string) => <Text>${total}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => dayjs(date).format('MMM D, YYYY'),
    },
  ]

  const customOrderColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
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
    {
      title: 'Bids',
      key: 'bids',
      render: (_: any, record: any) => record.bids.length,
    },
  ]

  const donationColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
    },
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
    {
      title: 'Kindness Points',
      dataIndex: 'kindnessPoints',
      key: 'kindnessPoints',
      render: (points: number) => <Text strong>{points.toString()}</Text>,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>
          <i className="las la-user-circle" style={{ marginRight: '8px' }}></i>
          Customer Dashboard
        </Title>
        <Text type="secondary">
          Manage your orders, custom requests, and track your donations
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <Space>
                  <i className="las la-shopping-cart"></i>
                  Active Orders
                </Space>
              }
            >
              <Table
                dataSource={orders}
                columns={orderColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>

            <Card
              title={
                <Space>
                  <i className="las la-clipboard-list"></i>
                  Custom Order Requests
                </Space>
              }
              style={{ marginTop: '24px' }}
            >
              <Table
                dataSource={customOrders}
                columns={customOrderColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <i className="las la-heart"></i>
                  Kindness Points
                </Space>
              }
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Title level={1} style={{ color: '#52c41a' }}>
                  {totalKindnessPoints.toString()}
                </Title>
                <Text type="secondary">Total Points Earned</Text>
              </div>
            </Card>

            <Card
              title={
                <Space>
                  <i className="las la-hand-holding-heart"></i>
                  Recent Donations
                </Space>
              }
              style={{ marginTop: '24px' }}
            >
              <Table
                dataSource={donations}
                columns={donationColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
