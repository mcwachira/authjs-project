import React, { FunctionComponent } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface OwnProps {

    href:string;
    label:string
}

type Props = OwnProps;

export const BackButton: FunctionComponent<Props> = ({href , label}:Props) => {

  return (

      <Button variant='link' className='font-normal w-full ' size='sm' asChild>

          <Link href={href}>
              {label}
          </Link>

      </Button>
  );
};


