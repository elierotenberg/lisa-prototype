import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useRouter } from "next/dist/client/router";

type NavLinkProps = Omit<NextLinkProps, "as" | "passHref"> & ChakraLinkProps;

export const NavLink: FunctionComponent<NavLinkProps> = ({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...props
}) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;
  return (
    <NextLink
      {...{ href, prefetch, scroll, shallow, locale, replace }}
      passHref
    >
      <ChakraLink {...props} variant={isActive ? "active" : undefined} />
    </NextLink>
  );
};
