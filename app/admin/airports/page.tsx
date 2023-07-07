import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { UserPlusIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
} from "@/components/MaterialComponents"
import { prisma } from "@/server/db"
import Link from "next/link"

const TABLE_HEAD = ["Airport Code", "Airport Name", "City", "State"]

export default async function Airports() {
  const airports = await prisma.airport.findMany()

  return (
    <Card color="transparent" className="h-full w-full">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="my-3 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" className="text-foreground">
              Airports list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all airports
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link href="/admin/airports/add">
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Airport
              </Button>
            </Link>
            <Link href="/admin/airports/delete">
              <Button className="flex items-center gap-3" color="red" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Delete
                Airport
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody color="transparent" className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-200 p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-foreground leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {airports.map(({ name, airport_code, city, state }) => {
              const classes = "p-4 border-b border-gray-600"

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {airport_code}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {city}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {state}
                    </Typography>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}
