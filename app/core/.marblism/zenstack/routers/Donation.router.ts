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

        createMany: procedure.input($Schema.DonationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.createMany(input as any))),

        create: procedure.input($Schema.DonationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.create(input as any))),

        deleteMany: procedure.input($Schema.DonationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.deleteMany(input as any))),

        delete: procedure.input($Schema.DonationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.delete(input as any))),

        findFirst: procedure.input($Schema.DonationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).donation.findFirst(input as any))),

        findMany: procedure.input($Schema.DonationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).donation.findMany(input as any))),

        findUnique: procedure.input($Schema.DonationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).donation.findUnique(input as any))),

        updateMany: procedure.input($Schema.DonationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.updateMany(input as any))),

        update: procedure.input($Schema.DonationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).donation.update(input as any))),

        count: procedure.input($Schema.DonationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).donation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DonationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DonationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DonationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DonationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DonationGetPayload<T>, Context>) => Promise<Prisma.DonationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DonationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DonationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DonationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DonationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DonationGetPayload<T>, Context>) => Promise<Prisma.DonationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DonationFindFirstArgs, TData = Prisma.DonationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DonationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DonationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DonationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DonationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DonationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DonationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DonationFindManyArgs, TData = Array<Prisma.DonationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DonationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DonationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DonationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DonationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DonationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DonationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DonationFindUniqueArgs, TData = Prisma.DonationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DonationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DonationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DonationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DonationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DonationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DonationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DonationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DonationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DonationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DonationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DonationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DonationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DonationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DonationGetPayload<T>, Context>) => Promise<Prisma.DonationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DonationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DonationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DonationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DonationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DonationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DonationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DonationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DonationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
