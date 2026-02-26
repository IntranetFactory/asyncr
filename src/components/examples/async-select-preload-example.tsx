"use client";

import { User, searchAllUsers } from "@/app/actions";
import { APISelect } from "@/components/async-select";
import { useState } from "react";

export default function AsyncSelectExample() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  return (
    <APISelect<User>
      fetcher={searchAllUsers}
      preload
      filterFn={(user, query) => user.name.toLowerCase().includes(query.toLowerCase())}
      renderItem={(user) => (
        <>
          {/* <Image
            src={user.avatar}
            alt={user.name}
            width={24}
            height={24}
            className="rounded-full"
          /> */}
          <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.role}</div>
          </div>
        </>
      )}
      getOptionValue={(user) => user.id}
      notFound={<div className="py-6 text-center text-sm">No users found</div>}
      label="User"
      placeholder="Search users..."
      value={selectedUser}
      onChange={setSelectedUser}
      width="350px"
    />
  )
}