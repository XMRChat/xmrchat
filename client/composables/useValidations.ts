import type { Validation } from "@vuelidate/core";
import {
  required as baseRequired,
  email as baseEmail,
  numeric as baseNumberic,
  minValue as baseMinValue,
  maxValue as baseMaxValue,
  minLength as baseMinLength,
  maxLength as baseMaxLength,
  between as baseBetween,
  sameAs as baseSameAs,
  url as baseUrl,
  integer as baseInteger,
  helpers,
  not
} from "@vuelidate/validators";
// import { getProperty } from "~/utils";

export const useValidations = (generalV?: Ref<Validation>) => {
  const { t } = useI18n();
  const { network } = useMoneroNetwork()
  const required = helpers.withMessage(
    () => t("validations.required"),
    baseRequired
  );
  const email = helpers.withMessage(() => t("validations.email"), baseEmail);
  const numberic = helpers.withMessage(
    () => t("validations.numberic"),
    baseNumberic
  );

  const integer = helpers.withMessage(
    () => t("validations.numberic"),
    baseInteger
  );

  const url = helpers.withMessage(() => t("validations.url"), baseUrl);
  const notUrl = helpers.withMessage(
    () => t("validations.notUrl"),
    (...params) => (params[0] ? !baseUrl.$validator(...params) : true)
  );

  const minLength = (...v: Parameters<typeof baseMinLength>) =>
    helpers.withMessage(
      ({ $params }) => t("validations.minLength", { length: $params.min }),
      baseMinLength(...v)
    );

  const maxLength = (...v: Parameters<typeof baseMinLength>) =>
    helpers.withMessage(
      ({ $params }) => t("validations.maxLength", { length: $params.max }),
      baseMaxLength(...v)
    );

  const minValue = (...v: Parameters<typeof baseMinValue>) =>
    helpers.withMessage(
      ({ $params }) => t("validations.minValue", { value: $params.min }),
      baseMinValue(...v)
    );
  const maxValue = (...v: Parameters<typeof baseMaxValue>) =>
    helpers.withMessage(
      ({ $params }) => t("validations.maxValue", { value: $params.max }),
      baseMaxValue(...v)
    );

  const between = (...v: Parameters<typeof baseBetween>) =>
    helpers.withMessage(
      ({ $params }) =>
        t("validations.between", { value: $params.min, max: $params.max }),
      baseBetween(...v)
    );

  const sameAs = (...v: Parameters<typeof baseSameAs>) =>
    helpers.withMessage(
      ({ $params }) =>
        t("validations.sameAs", { otherName: $params.otherName }),
      baseSameAs(...v)
    );

  const streamerSlugBase = helpers.regex(/^[a-z0-9_-]+$/);

  const streamerSlug = helpers.withMessage(
    t("validations.streamerSlug"),
    streamerSlugBase
  );

  const moneroPrimaryAddressBase = (v: any) => typeof v === "string" && network.value.validationCharacters.includes(v[0])

  const moneroPrimaryAddress = helpers.withMessage(
    t("validations.moneroPrimaryAddress", { characters: network.value?.validationCharacters.join(", ") || "" }),
    moneroPrimaryAddressBase
  );

  const streamerSlugInternalBase = (v: string) =>
    ![
      "auth",
      "guides",
      "streamer",
      "contact",
      "creator",
      "creators",
      "subscribe",
      "subscription",
      "subscriptions",
      "test",
      "test-page",
    ].includes(v);

  const streamerSlugInternal = helpers.withMessage(
    "This slug is not usable.",
    streamerSlugInternalBase
  );

  const rumbleApiUrlBase = (v: any) => {
    if (!v) return true;
    return v.startsWith("https://rumble.com/-livestream-api/get-data?key=");
  };

  const rumbleApiUrl = helpers.withMessage(
    () => t("validations.rumbleApiUrl"),
    rumbleApiUrlBase
  );

  const notStartingWithAtBase = (v: any) => {
    if (!v) return true;
    if (typeof v !== "string") return true;
    return !v.trimStart().startsWith("@");
  };

  const notStartingWithAt = helpers.withMessage(
    "Text cannot start with '@'.",
    notStartingWithAtBase
  );

  const matrixIdBase = (v: any) => {
    if (!v) return true;
    if (typeof v !== "string") return false;
    return /^@[^\s:]+:[^\s:]+$/.test(v.trim());
  };

  const matrixId = helpers.withMessage(
    "Enter a Matrix ID like @user:matrix.org.",
    matrixIdBase
  );

  const getValidationAttrs = (path: string, v?: MaybeRef<Validation>) => {
    v = unref(v || generalV);
    const instance = getProperty(v, path);

    return {
      onBlur: instance.$touch,
      error: instance.$errors[0]?.$message,
    };
  };

  const validate = async (v?: MaybeRef<Validation>) => {
    v = unref(v || generalV);
    if (!v) return;

    v.$touch();
    await v.$validate();
    return v.$errors.map((error: any) => ({
      message: error.$message,
      path: error.$propertyPath,
    })) as any;
  };

  return {
    required,
    email,
    numberic,
    integer,
    minLength,
    maxLength,
    minValue,
    maxValue,
    between,
    sameAs,
    url,
    notUrl,
    streamerSlug,
    streamerSlugInternal,
    moneroPrimaryAddress,
    rumbleApiUrl,
    notStartingWithAt,
    matrixId,
    getValidationAttrs,
    validate,
  };
};
