import { useT, TParams, tr, Talkr, KeyPath } from "talkr";
import en from "src/translations/en.json";
import { PropsWithChildren } from "react";

type Key = KeyPath<typeof en>;

export const IntlProvider = ({ children }: PropsWithChildren) => (
  <Talkr languages={{ en }} defaultLanguage="en">
    {children}
  </Talkr>
);

export const useIntl = () => {
  const { locale, setLocale, languages, defaultLanguage } = useT();
  return {
    setLocale,
    locale,
    T: (key: Key, params?: TParams) => tr({ locale, languages, defaultLanguage }, key, params),
  };
};
