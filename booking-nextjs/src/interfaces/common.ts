import { StatusComponent, positionEnum } from '@/components/constants/enum';

export interface UserRes {
    errCode: number;
    errMessage: string;
    users: {
        data: UserList[];
        totalPages: number;
    };
}
export interface UserList {
    id: number;
    email: string;
    address: string;
    gender: string;
    image: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roleId: StatusComponent;
    positionId: positionEnum;
    createdAt: string;
    positionData?: {
        valueVi: string;
    };
}
export type ProvinceType = {
    name: string;
    code: number;
};
export type PositionType = {
    keyMap: string;
    type: string;
    valueVi: string;
};
export type CreateUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    district: string;
    gender: string;
    roleId: string;
    positionId: string;
    image: File;
};
export type SpecialData = {
    id: number;
    name: string;
    image: string;
    descriptionHTML: string;
    descriptionMarkdown: string;
    createdAt: string;
    address: string;
};
export type DoctorInforData = {
    doctorId: string;
    description: string;
    paymentId: string;
    priceId: string;
    provinceId: string;
    specialtyId: number;
    clinicId: number;
    contentHTML: string;
    contentMarkdowmn: string;
    action: string;
};
export interface IdataTime extends PositionType {
    isSelected: boolean;
    id: number;
}
export interface InforDoctorData {
    DoctorInfor: {
        SpecialtyId: number;
        clinicId: number;
        priceId: string;
        paymentId: string;
        specialtyData: {
            name: string;
        };
        addressClinic?: string;
        nameClinic?: string;
        priceData?: {
            valueVi: string;
        };
        paymentData?: {
            valueVi: string;
        };
    };
    Markdown: {
        description: string;
        contentHTML: string;
        contentMarkdowmn: string;
    };
}
export interface AllDataDoctor extends InforDoctorData {
    firstName: string;
    lastName: string;
    image: string;
    address: string;
    id: number;
}
export type ScheduleDoctor = {
    doctorId: number;
    timeSelected: IdataTime[];
};
export type detailScheduleData = {
    date: string;
    doctorId: number;
    timeType: string;
    currentNumber: number;
    timeTypeData: {
        valueVi: string;
    };

};
export interface AllDoctor extends InforDoctorData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: string;
    roleId: string;
    positionId: string;
    image: string;
    positionData?: {
        valueVi: string;
    };
}

export interface IDoctorClinics {
    id: number;
    specialtyId: number;
    nameClinic: string;
    User: UserList;
}


export interface IBlogs extends IMarkdown {
    id: number;
    userId: number;
    accept: number;
    title: string;
    thumb: string;
    topic: string;
    createdAt: string;
    updatedAt: string;
    User: {
        firstName: string;
        lastName: string;
        image: string;
        
    };
}
export interface IDataBooking {
    email: string;
    doctorId: number;
    date: number;
    timeType: string;
    fullName: string;
    selectedGender: string;
    address: string;
    phoneNumber: number;
    note: string;
    timeString? : string ;
    doctorName? : string ;
}
interface IMarkdown {
    descriptionHTML: string;
    descriptionMarkdown: string;
}
export interface IDataCreateClinic extends IMarkdown {
    image: File;
    name: string;
    address: string;
}


export interface IDataDoctorForSpecial extends IMarkdown {
    name?: string;
    doctorSpecialty: {
        doctorId: number;
    }[];
}

export interface IDataPatient {
    id: number;
    doctorId: number;
    date: string;
    patientId: number;
    timeType: string;
    timeTypeDataPatient: {
        valueVi: string;
    };
    patientData: {
        address: string;
        email: string;
        firstName: string;
        genderData: {
            valueVi: string;
        };
    };
    updatedAt: string;
    totalPages: number;
}
export interface IHistory {
    id: number;
    files: string;
    doctorId: string;
    description: string;
    createdAt: string;
    patientHistoryData: {
        email: string;
        firstName: string;
        address : string;
    };
}
