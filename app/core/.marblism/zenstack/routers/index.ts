/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createProductRouter from "./Product.router";
import createOrderRouter from "./Order.router";
import createOrderItemRouter from "./OrderItem.router";
import createCustomOrderRouter from "./CustomOrder.router";
import createBidRouter from "./Bid.router";
import createDonationRouter from "./Donation.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as OrderClientType } from "./Order.router";
import { ClientType as OrderItemClientType } from "./OrderItem.router";
import { ClientType as CustomOrderClientType } from "./CustomOrder.router";
import { ClientType as BidClientType } from "./Bid.router";
import { ClientType as DonationClientType } from "./Donation.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        product: createProductRouter(router, procedure),
        order: createOrderRouter(router, procedure),
        orderItem: createOrderItemRouter(router, procedure),
        customOrder: createCustomOrderRouter(router, procedure),
        bid: createBidRouter(router, procedure),
        donation: createDonationRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    order: OrderClientType<AppRouter>;
    orderItem: OrderItemClientType<AppRouter>;
    customOrder: CustomOrderClientType<AppRouter>;
    bid: BidClientType<AppRouter>;
    donation: DonationClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
