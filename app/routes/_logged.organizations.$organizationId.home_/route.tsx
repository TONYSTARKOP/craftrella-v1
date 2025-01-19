import {
  Typography,
  Input,
  Select,
  Card,
  Row,
  Col,
  Space,
  Divider,
  Rate,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('')

  // Fetch all products with their sellers
  const { data: products } = Api.product.findMany.useQuery({
    include: {
      user: true,
      organization: true,
    },
  })

  // Get featured products (those with quantity > 5)
  const featuredProducts = products?.filter(p => p.quantity > 5)

  // Get top rated sellers (simplified example)
  const topSellers = products
    ?.reduce((acc: any[], product) => {
      if (!acc.find(s => s.id === product.user?.id)) {
        acc.push({
          id: product.user?.id,
          name: product.user?.name,
          rating: 4.5, // This would normally come from a rating system
        })
      }
      return acc
    }, [])
    .slice(0, 4)

  // Filter products based on search and filters
  const filteredProducts = products?.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory
    const matchesSize = !selectedSize || product.size === selectedSize
    const matchesPrice =
      !priceRange ||
      (priceRange === 'low'
        ? parseInt(product.price) <= 50
        : priceRange === 'medium'
        ? parseInt(product.price) > 50 && parseInt(product.price) <= 100
        : parseInt(product.price) > 100)
    return matchesSearch && matchesCategory && matchesSize && matchesPrice
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={1}>
          <i className="las la-shopping-bag" style={{ marginRight: 8 }}></i>
          Marketplace
        </Title>
        <Text type="secondary">
          Browse our collection of quality second-hand clothing
        </Text>

        <Space
          direction="vertical"
          size="large"
          style={{ width: '100%', marginTop: 24 }}
        >
          {/* Search and Filters */}
          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Search
                placeholder="Search for items or sellers..."
                allowClear
                enterButton
                size="large"
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select Category"
                    onChange={setSelectedCategory}
                    allowClear
                  >
                    <Select.Option value="Shirts">Shirts</Select.Option>
                    <Select.Option value="Pants">Pants</Select.Option>
                    <Select.Option value="Dresses">Dresses</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select Size"
                    onChange={setSelectedSize}
                    allowClear
                  >
                    <Select.Option value="S">Small</Select.Option>
                    <Select.Option value="M">Medium</Select.Option>
                    <Select.Option value="L">Large</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Price Range"
                    onChange={setPriceRange}
                    allowClear
                  >
                    <Select.Option value="low">Under $50</Select.Option>
                    <Select.Option value="medium">$50 - $100</Select.Option>
                    <Select.Option value="high">Over $100</Select.Option>
                  </Select>
                </Col>
              </Row>
            </Space>
          </Card>

          {/* Featured Products */}
          <div>
            <Title level={3}>
              <i className="las la-star" style={{ marginRight: 8 }}></i>
              Featured Products
            </Title>
            <Row gutter={[16, 16]}>
              {featuredProducts?.slice(0, 4).map(product => (
                <Col xs={24} sm={12} md={6} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={
                          product.pictureUrl ||
                          'https://placeholder.com/300x200'
                        }
                      />
                    }
                    onClick={() =>
                      navigate(
                        `/organizations/${product.organizationId}/products/${product.id}`,
                      )
                    }
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <Space direction="vertical">
                          <Text>${product.price}</Text>
                          <Text type="secondary">{product.user?.name}</Text>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Top Rated Sellers */}
          <div>
            <Title level={3}>
              <i className="las la-crown" style={{ marginRight: 8 }}></i>
              Top Rated Sellers
            </Title>
            <Row gutter={[16, 16]}>
              {topSellers?.map(seller => (
                <Col xs={24} sm={12} md={6} key={seller.id}>
                  <Card>
                    <Space
                      direction="vertical"
                      align="center"
                      style={{ width: '100%' }}
                    >
                      <i
                        className="las la-user-circle"
                        style={{ fontSize: 48 }}
                      ></i>
                      <Text strong>{seller.name}</Text>
                      <Rate disabled defaultValue={seller.rating} />
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* All Products */}
          <div>
            <Title level={3}>
              <i className="las la-tshirt" style={{ marginRight: 8 }}></i>
              All Products
            </Title>
            <Row gutter={[16, 16]}>
              {filteredProducts?.map(product => (
                <Col xs={24} sm={12} md={6} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={
                          product.pictureUrl ||
                          'https://placeholder.com/300x200'
                        }
                      />
                    }
                    onClick={() =>
                      navigate(
                        `/organizations/${product.organizationId}/products/${product.id}`,
                      )
                    }
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <Space direction="vertical">
                          <Text>${product.price}</Text>
                          <Text type="secondary">{product.user?.name}</Text>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Donation Portal Link */}
          <Card
            style={{
              textAlign: 'center',
              background: '#f0f2f5',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/organizations/1/donations')}
          >
            <Space direction="vertical">
              <i
                className="las la-hand-holding-heart"
                style={{ fontSize: 48 }}
              ></i>
              <Title level={4}>Want to make a difference?</Title>
              <Text>
                Visit our donation portal to contribute to those in need
              </Text>
            </Space>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
