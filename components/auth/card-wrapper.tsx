import React, { FunctionComponent } from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {Social} from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";

interface OwnProps {
    children:React.ReactNode;
    headerLabel:string,
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean
}

type Props = OwnProps;

export const CardWrapper: FunctionComponent<Props> = ({
    children,
        headerLabel,
        backButtonLabel,
        backButtonHref,
        showSocial
}:Props) => {

  return (
      <Card className="w-[400px] shadow-md">

          <CardHeader>
              <Header label={headerLabel}/>
          </CardHeader>

          <CardContent>
              {children}
          </CardContent>

          {showSocial && <CardFooter>
              <Social/>
          </CardFooter>}

          <BackButton label={backButtonLabel} href={backButtonHref}/>
      </Card>
  );
};


