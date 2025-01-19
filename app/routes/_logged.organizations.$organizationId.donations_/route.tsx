import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Select,
  Row,
  Col,
  Tag,
  Statistic,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DonationsPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { data: donations, refetch } = Api.donation.findMany.useQuery({
    where: {
      userId: user?.id,
      organizationId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const totalKindnessPoints =
    donations?.reduce(
      (acc, donation) => acc + (donation.kindnessPoints || 0),
      0,
    ) || 0

  const { mutateAsync: createDonation } = Api.donation.create.useMutation()

  const onFinish = async (values: any) => {
    if (!user?.id || !organizationId) {
      return
    }

    try {
      await createDonation({
        data: {
          description: values.description,
          pickupTime: values.pickupTime.format(),
          status: 'PENDING',
          kindnessPoints: 0,
          userId: user.id,
          organizationId: organizationId,
        },
      })
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Failed to create donation:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'orange',
      APPROVED: 'green',
      COMPLETED: 'blue',
      REJECTED: 'red',
    }
    return colors[status] || 'default'
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i
            className="las la-hand-holding-heart"
            style={{ marginRight: 8 }}
          ></i>
          Donations Center
        </Title>
        <Text>Make a difference by donating items to those in need.</Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={8}>
            <Card>
              <Statistic
                title="Total Kindness Points"
                value={totalKindnessPoints}
                prefix={
                  <i className="las la-star" style={{ color: '#faad14' }}></i>
                }
              />
            </Card>

            <Card style={{ marginTop: 24 }}>
              <Title level={4}>
                <i
                  className="las la-plus-circle"
                  style={{ marginRight: 8 }}
                ></i>
                Create New Donation
              </Title>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="description"
                  label="Item Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please describe your donation',
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Describe the items you want to donate..."
                  />
                </Form.Item>

                <Form.Item
                  name="pickupTime"
                  label="Preferred Pickup Time"
                  rules={[
                    { required: true, message: 'Please select a pickup time' },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    <i
                      className="las la-paper-plane"
                      style={{ marginRight: 8 }}
                    ></i>
                    Submit Donation Request
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card>
              <Title level={4}>
                <i className="las la-history" style={{ marginRight: 8 }}></i>
                Donation History
              </Title>

              {donations?.map(donation => (
                <Card
                  key={donation.id}
                  style={{ marginBottom: 16 }}
                  type="inner"
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong>{donation.description}</Text>
                      <br />
                      <Text type="secondary">
                        Pickup:{' '}
                        {dayjs(donation.pickupTime).format(
                          'MMM D, YYYY h:mm A',
                        )}
                      </Text>
                    </Col>
                    <Col>
                      <Tag color={getStatusColor(donation.status)}>
                        {donation.status}
                      </Tag>
                      {donation.kindnessPoints > 0 && (
                        <Tag color="gold">
                          <i
                            className="las la-star"
                            style={{ marginRight: 4 }}
                          ></i>
                          {donation.kindnessPoints} Points
                        </Tag>
                      )}
                    </Col>
                  </Row>
                </Card>
              ))}

              {(!donations || donations.length === 0) && (
                <Text type="secondary">
                  No donations found. Start by creating your first donation!
                </Text>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
