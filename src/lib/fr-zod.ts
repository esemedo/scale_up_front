import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/fr/zod.json";
import { parsePhoneNumber } from "libphonenumber-js";

// lng and resources key depend on your locale.
i18next.init({
  lng: "fr",
  resources: {
    fr: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export const zPhoneNumber = z
  .string()
  .min(10)
  .transform((value, ctx) => {
    const phoneNumber = parsePhoneNumber(value, {
      defaultCountry: "FR",
    });

    if (!phoneNumber?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le numéro de téléphone n'est pas valide",
      });
      return z.NEVER;
    }
    return phoneNumber.format("E.164");
  });

// export configured zod instance
export { z };
