import { BreadcrumbsItem } from '../Breadcrumbs';
import { pageRouters } from './router';

interface BreadcrumbsData {
    [key: string]: BreadcrumbsItem;
}

export const breadcrumbsData: BreadcrumbsData = {
    [pageRouters.DOCTOR]: {
        href: pageRouters.DOCTOR,
        name: 'Doctors',
        current: false,
    },
    [pageRouters.DOCTOR_DETAIL('2')]: {
        href: pageRouters.DOCTOR_DETAIL('2'),
        name: 'Detail',
        current: false,
    },
    [pageRouters.ALL_BLOG]: {
        href: pageRouters.ALL_BLOG,
        name: 'Handbooks',
        current: false,
    },
    [pageRouters.SPECIAL]: {
        href: pageRouters.SPECIAL,
        name: 'Specials',
        current: false,
    },
    [pageRouters.CLINIC]: {
        href: pageRouters.CLINIC,
        name: 'Clinic',
        current: false,
    },
};
