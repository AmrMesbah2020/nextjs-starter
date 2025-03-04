import { Metadata } from "next";
import { lusitana } from '@/app/ui/fonts';
import Table from "@/app/ui/customers/table";
import { fetchCustomersPages } from "@/app/lib/data";
import { Suspense } from "react";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { CreateCustomer } from "@/app/ui/invoices/buttons";


export const metadata: Metadata = {
    title: "Customers"
}
async function Page(props: {
    searchParams?: Promise<{
        query: string,
        currentPage: string
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = searchParams?.currentPage ?? 1;

    const totalPages = await fetchCustomersPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search customers..." />
                <CreateCustomer />
            </div>
            <Suspense key={query} fallback={<CustomersTableSkeleton />}>
                <Table currentPage={currentPage} query={query} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

export default Page;