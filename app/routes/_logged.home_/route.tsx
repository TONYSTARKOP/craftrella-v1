import { Typography, Card, Space, Row, Col } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '2rem' }}>
        <Col xs={24} sm={20} md={16} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>
                <i className="las la-home" /> Welcome to Our Platform
              </Title>
              <Paragraph>
                Discover a new way to connect, trade, and make a difference in
                your community
              </Paragraph>
            </div>

            <Card>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Title level={3}>
                  <i className="las la-shopping-cart" /> Buy Products
                </Title>
                <Paragraph>
                  Browse through our marketplace to find unique products from
                  local sellers. Purchase items directly or create custom orders
                  for specific needs.
                </Paragraph>

                <Title level={3}>
                  <i className="las la-store" /> Sell Products
                </Title>
                <Paragraph>
                  Set up your store, list products, and reach customers in your
                  area. Manage your inventory and track orders easily through
                  the seller dashboard.
                </Paragraph>

                <Title level={3}>
                  <i className="las la-hands-helping" /> Make Donations
                </Title>
                <Paragraph>
                  Support your community by making donations. Earn kindness
                  points and help those in need while reducing waste.
                </Paragraph>

                <Title level={3}>
                  <i className="las la-comments" /> Chat System
                </Title>
                <Paragraph>
                  Communicate directly with buyers, sellers, and donors through
                  our integrated chat system. Discuss details and arrange
                  transactions safely.
                </Paragraph>

                <Title level={3}>
                  <i className="las la-clipboard-list" /> Custom Orders
                </Title>
                <Paragraph>
                  Can't find what you're looking for? Create a custom order
                  request and receive bids from interested sellers.
                </Paragraph>
              </Space>
            </Card>

            <Card>
              <Title level={3} style={{ textAlign: 'center' }}>
                <i className="las la-rocket" /> Getting Started
              </Title>
              <Paragraph>
                1. Create an account or sign in 2. Join or create an
                organization 3. Start buying, selling, or donating 4. Connect
                with others in your community
              </Paragraph>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
