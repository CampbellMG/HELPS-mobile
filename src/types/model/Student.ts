export interface Student {
    id: number,
    name: string
    prefFirstName: string,
    faculty: string,
    course: string,
    email: string,
    homePhone: string,
    mobile: string,
    bestContactNumber: string,
    dob: string,
    gender: string,
    degree: string,
    year: string,
    status: string,
    firstLanguage: string,
    countryOfOrigin: string,
    educationalBackground: string,
    other: string
}

export const StudentKeyMap: {[key in keyof Student]: string} = {
    id: 'Student ID',
    name: 'Name',
    prefFirstName: 'Preferred First Name',
    faculty: 'Faculty',
    course: 'Course',
    email: 'Email',
    homePhone: 'Home Phone',
    mobile: 'Mobile Phone',
    bestContactNumber: 'Best Contact Number',
    dob: 'Date of Birth',
    gender: 'Gender',
    degree: 'Degree',
    year: 'Year',
    status: 'Status',
    firstLanguage: 'First Language',
    countryOfOrigin: 'Country of Origin',
    educationalBackground: 'Educational Background',
    other: 'Other'
}