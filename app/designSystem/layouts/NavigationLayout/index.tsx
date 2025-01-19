import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'
import { Flex } from 'antd'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

import { useUserContext } from '~/core/context'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const pathname = useLocation().pathname
  const params: Record<string, string> = useParams()

  const { organization } = useUserContext()

  const goTo = (url: string) => {
    router(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/organizations/:organizationId/home',
      label: 'Home Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/home'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/custom-orders',
      label: 'Custom Orders',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/custom-orders'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/customer-dashboard',
      label: 'Customer Dashboard',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/customer-dashboard'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/seller-dashboard',
      label: 'Seller Dashboard',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/seller-dashboard'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/donations',
      label: 'Donations',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/donations'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/chat',
      label: 'Chat',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/chat'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/admin-dashboard',
      label: 'Admin Dashboard',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/admin-dashboard'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',

      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/pricing'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
