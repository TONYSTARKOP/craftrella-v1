import {
  Typography,
  Card,
  Table,
  Button,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  message,
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

export default function AdminDashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('PENDING')

  // Fetch sellers (users with pending organization roles)
  const { data: organizationRoles, refetch: refetchRoles } =
    Api.organizationRole.findMany.useQuery({
      where: { name: 'owner' },
    })

  // Fetch products for moderation
  const { data: products, refetch: refetchProducts } =
    Api.product.findMany.useQuery({
      include: { user: true },
    })

  // Fetch support tickets (disputes)
  const { data: supportTickets, refetch: refetchTickets } =
    Api.supportTicket.findMany.useQuery({
      where: { status: 'OPEN' },
    })

  // Fetch analytics metrics
  const { data: metrics } = Api.analyticsLocalMetric.findMany.useQuery({})

  // Mutations
  const { mutateAsync: updateRole } = Api.organizationRole.update.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: updateTicket } = Api.supportTicket.update.useMutation()

  // Handle seller approval/rejection
  const handleSellerStatus = async (roleId: string, approved: boolean) => {
    try {
      await updateRole({
        where: { id: roleId },
        data: { name: approved ? 'owner' : 'rejected' },
      })
      message.success(
        `Seller ${approved ? 'approved' : 'rejected'} successfully`,
      )
      refetchRoles()
    } catch (error) {
      message.error('Failed to update seller status')
    }
  }

  // Handle product moderation
  const handleProductStatus = async (productId: string, status: string) => {
    try {
      await updateProduct({
        where: { id: productId },
        data: { status },
      })
      message.success('Product status updated successfully')
      refetchProducts()
    } catch (error) {
      message.error('Failed to update product status')
    }
  }

  // Handle dispute resolution
  const handleDispute = async (ticketId: string, status: 'OPEN' | 'CLOSED') => {
    try {
      await updateTicket({
        where: { id: ticketId },
        data: { status },
      })
      message.success('Dispute status updated successfully')
      refetchTickets()
    } catch (error) {
      message.error('Failed to update dispute status')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-user-shield" style={{ marginRight: '8px' }}></i>
          Admin Dashboard
        </Title>
        <Text type="secondary">
          Manage sellers, products, disputes, and monitor platform metrics
        </Text>

        {/* Analytics Section */}
        <Row gutter={16} style={{ marginTop: '24px' }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={metrics?.[0]?.countPositive || 0}
                prefix={<i className="las la-users"></i>}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Products"
                value={products?.length || 0}
                prefix={<i className="las la-box"></i>}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Open Disputes"
                value={supportTickets?.length || 0}
                prefix={<i className="las la-exclamation-circle"></i>}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pending Sellers"
                value={organizationRoles?.length || 0}
                prefix={<i className="las la-user-clock"></i>}
              />
            </Card>
          </Col>
        </Row>

        {/* Seller Applications */}
        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>
            <i className="las la-user-plus"></i> Seller Applications
          </Title>
          <Table
            dataSource={organizationRoles}
            columns={[
              { title: 'User ID', dataIndex: ['user', 'id'] },
              { title: 'Name', dataIndex: ['user', 'name'] },
              { title: 'Email', dataIndex: ['user', 'email'] },
              {
                title: 'Date Applied',
                dataIndex: 'createdAt',
                render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
              },
              {
                title: 'Actions',
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => handleSellerStatus(record.id, true)}
                    >
                      <i className="las la-check"></i> Approve
                    </Button>
                    <Button
                      danger
                      onClick={() => handleSellerStatus(record.id, false)}
                    >
                      <i className="las la-times"></i> Reject
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>

        {/* Product Moderation */}
        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>
            <i className="las la-box"></i> Product Moderation
          </Title>
          <Table
            dataSource={products}
            columns={[
              { title: 'Product Name', dataIndex: 'name' },
              { title: 'Seller', dataIndex: ['user', 'name'] },
              { title: 'Price', dataIndex: 'price' },
              {
                title: 'Status',
                dataIndex: 'status',
                render: (status: string) => (
                  <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
                    {status}
                  </Tag>
                ),
              },
              {
                title: 'Actions',
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => handleProductStatus(record.id, 'ACTIVE')}
                    >
                      <i className="las la-check"></i> Approve
                    </Button>
                    <Button
                      danger
                      onClick={() => handleProductStatus(record.id, 'INACTIVE')}
                    >
                      <i className="las la-ban"></i> Block
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>

        {/* Disputes Management */}
        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>
            <i className="las la-exclamation-triangle"></i> User Disputes
          </Title>
          <Table
            dataSource={supportTickets}
            columns={[
              { title: 'Subject', dataIndex: 'subject' },
              { title: 'User Email', dataIndex: 'userEmail' },
              {
                title: 'Status',
                dataIndex: 'status',
                render: (status: string) => (
                  <Tag color={status === 'OPEN' ? 'blue' : 'green'}>
                    {status}
                  </Tag>
                ),
              },
              {
                title: 'Date',
                dataIndex: 'createdAt',
                render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
              },
              {
                title: 'Actions',
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => handleDispute(record.id, 'CLOSED')}
                    disabled={record.status === 'CLOSED'}
                  >
                    <i className="las la-check-circle"></i> Resolve
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
