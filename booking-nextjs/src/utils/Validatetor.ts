import { PASSWORD_MIN_LENGTH, URL_MAX_LENGTH } from '@/components/constants';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/components/constants/regex';
import {
    EMAIL_REQUIRED,
    PASSWORD_MIN_LENGTH_MESSAGE,
    PLEASE_ENTER_VALID_FORMAT,
    PASSWORD_REQUIRED,
    VALUE_REQUIRED,
    PHONE_NUMBER_REQUIRED_MESSAGE,
    PHONE_NUMBER_WRONG_MESSAGE,
} from '@/components/constants/message';

export const emailRules = (isRequired = false, requireMsg = EMAIL_REQUIRED, patternMsg = PLEASE_ENTER_VALID_FORMAT) => {
    return {
        ...(isRequired && { required: requireMsg }),
        pattern: {
            value: EMAIL_REGEX,
            message: patternMsg,
        },
    };
};

export const passwordLoginRules = (isRequired = false) => {
    return {
        ...(isRequired && { required: PASSWORD_REQUIRED }),
    };
};
export const fieldRules = (isRequired = false) => {
    return {
        ...(isRequired && { required: VALUE_REQUIRED })
    };
};
export const validateRules = (isRequired = false) => {
    return {
        ...(isRequired && { required: VALUE_REQUIRED }),
        minLength: {
            value: 0,
            message: 'Số lần phải lớn hơn 0',
        },
    };
};

export const passwordRegisterRules = (isRequired = false) => {
    return {
        ...(isRequired && { required: PASSWORD_REQUIRED }),
        minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: PASSWORD_MIN_LENGTH_MESSAGE,
        },
    };
};
// export const onlyPhoneNumber = (msg = PHONE_NUMBER_WRONG_MESSAGE) => {
//     return {
//         pattern: {
//             value: PHONE_NUMBER_REGEX,
//             message: msg,
//         },
//     };
// };
export const phoneNumberRules = (
    isRequired = false,
    requireMsg = PHONE_NUMBER_REQUIRED_MESSAGE,
    patternMsg = PHONE_NUMBER_WRONG_MESSAGE,
) => {
    return {
        ...(isRequired && { required: requireMsg }),
        pattern: {
            value: PHONE_NUMBER_REGEX,
            message: patternMsg,
        },
    };
};
