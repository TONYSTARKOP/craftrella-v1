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

        createMany: procedure.input($Schema.BidInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.createMany(input as any))),

        create: procedure.input($Schema.BidInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.create(input as any))),

        deleteMany: procedure.input($Schema.BidInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.deleteMany(input as any))),

        delete: procedure.input($Schema.BidInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.delete(input as any))),

        findFirst: procedure.input($Schema.BidInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).bid.findFirst(input as any))),

        findMany: procedure.input($Schema.BidInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).bid.findMany(input as any))),

        findUnique: procedure.input($Schema.BidInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).bid.findUnique(input as any))),

        updateMany: procedure.input($Schema.BidInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.updateMany(input as any))),

        update: procedure.input($Schema.BidInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).bid.update(input as any))),

        count: procedure.input($Schema.BidInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).bid.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.BidCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.BidCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BidGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BidGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BidGetPayload<T>, Context>) => Promise<Prisma.BidGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.BidDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.BidDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BidGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BidGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BidGetPayload<T>, Context>) => Promise<Prisma.BidGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.BidFindFirstArgs, TData = Prisma.BidGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.BidFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BidGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BidFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BidFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BidGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BidGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.BidFindManyArgs, TData = Array<Prisma.BidGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.BidFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.BidGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BidFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BidFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.BidGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.BidGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.BidFindUniqueArgs, TData = Prisma.BidGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BidFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BidGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BidFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BidFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BidGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BidGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.BidUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.BidUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BidUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BidGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BidGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BidUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BidUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BidGetPayload<T>, Context>) => Promise<Prisma.BidGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.BidCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BidCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.BidCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.BidCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.BidCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.BidCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.BidCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BidCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
