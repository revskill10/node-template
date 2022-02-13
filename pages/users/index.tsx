import Link from 'next/link'
import Layout from '../../client/components/Layout'
import List from '../../client/components/List'
import { useGetApiUsers, GetUsersListResponseData } from 'client/core/service';
const WithData = () => {
  const { data, isLoading, isError } = useGetApiUsers();

  if (isLoading || isError) return null;
  return <WithStaticProps users={data.data.users} />
}
const WithStaticProps = ({ users: items }: GetUsersListResponseData) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default WithData
