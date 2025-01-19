/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CustomOrderInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.createMany(input as any))),

        create: procedure.input($Schema.CustomOrderInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.create(input as any))),

        deleteMany: procedure.input($Schema.CustomOrderInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.deleteMany(input as any))),

        delete: procedure.input($Schema.CustomOrderInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.delete(input as any))),

        findFirst: procedure.input($Schema.CustomOrderInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).customOrder.findFirst(input as any))),

        findMany: procedure.input($Schema.CustomOrderInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).customOrder.findMany(input as any))),

        findUnique: procedure.input($Schema.CustomOrderInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).customOrder.findUnique(input as any))),

        updateMany: procedure.input($Schema.CustomOrderInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.updateMany(input as any))),

        update: procedure.input($Schema.CustomOrderInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customOrder.update(input as any))),

        count: procedure.input($Schema.CustomOrderInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).customOrder.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CustomOrderCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CustomOrderCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CustomOrderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CustomOrderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CustomOrderGetPayload<T>, Context>) => Promise<Prisma.CustomOrderGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CustomOrderDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CustomOrderDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CustomOrderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CustomOrderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CustomOrderGetPayload<T>, Context>) => Promise<Prisma.CustomOrderGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CustomOrderFindFirstArgs, TData = Prisma.CustomOrderGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CustomOrderFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CustomOrderGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CustomOrderFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CustomOrderFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CustomOrderGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CustomOrderGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CustomOrderFindManyArgs, TData = Array<Prisma.CustomOrderGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CustomOrderFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CustomOrderGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CustomOrderFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CustomOrderFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CustomOrderGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CustomOrderGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CustomOrderFindUniqueArgs, TData = Prisma.CustomOrderGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CustomOrderFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CustomOrderGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CustomOrderFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CustomOrderFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CustomOrderGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CustomOrderGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CustomOrderUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CustomOrderUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CustomOrderUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CustomOrderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CustomOrderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CustomOrderUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CustomOrderUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CustomOrderGetPayload<T>, Context>) => Promise<Prisma.CustomOrderGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CustomOrderCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CustomOrderCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CustomOrderCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CustomOrderCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CustomOrderCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CustomOrderCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CustomOrderCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CustomOrderCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
