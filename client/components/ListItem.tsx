import React from 'react'
import Link from 'next/link'
import { IUser } from 'server/domain/entities/users';

type Props = {
  data: IUser
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
