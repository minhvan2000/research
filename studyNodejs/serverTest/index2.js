/* This file will handle an array contain multi string to convert to object with key is the snake case of item array */

const arrMessages = [
    'Login Successful',
    'Confirm Token Successful',
    'Forgot Password Successful',
    'Reset Password Successful',
    'Refresh Token Successful',
    'Send Commands By Device Id Successful',
    'Send Commands By Group Id Successful',
    'Get devices by summary Successful',
    'Get count total Successful',
    'Create A Single Device Successful',
    'Get All Devices Successful',
    'Get Device Statistics Successful',
    'Get A List Search Devices Successful',
    'Get A Single Device Successful',
    'Update A Single Device Successful',
    'Delete Device(s) Successful',
    'Create A Single Group Successful',
    'Get A List Search Group Successful',
    'Get A Single Group By Id Successful',
    'Get All Group Successful',
    'Update A Single Group Successful',
    'Delete Group(s) Successful',
    'Get Messages By Device Id Successful',
    'Delete Messages By Device Id Successful',
    'Get groups tree Successful',
    'Get devices by groups tree Successful',
    'Create A Single Source Type  Successful',
    'Get A List Search Source Type Successful',
    'Get A Single Source Type Successful',
    'Get All Source Type Successful',
    'Update A Single Source Type Successful',
    'Delete Source Type(s)',
    'Get Summary Statistics Successful',
    'Create A Single Tag Successful',
    'Get A Single Tag By Id Successful',
    'Get All Tags Successful',
    'Update A Tag Successful',
    'Delete Tag(s) Successful',
    'Create A Tenant Successful',
    'Get A List Search Tenants Successful',
    'Get A Single Tenant Successful',
    'Get All Tenants Successful',
    'Update A Single Tenant Successful',
    'Delete Tenant(s) Successful',
    'Create A Single User Successful',
    'Get A List Search Users Successful',
    'Get A Single User Successful',
    'Get All Users Successful',
    'Update A Single User Successful',
    'Delete User(s) Successful',
    'Token verification failed',
    'Missing User ID',
    'The user is not exist. Your request has been denied',
    'Your key is not exist',
    'Invalid User',
    'Refresh token authentication failed',
    'Missing authentication header',
    'Invalid access token format',
    'Access token authentication failed',
    'Permission denied',
    'Access Denied: Insufficient Permissions',
    'Execute access forbidden',
    'Email or Password is invalid',
    'Please confirm your email',
    'Valid token successful',
    'Invalid token',
    'Confirm email to success',
    'Email not registered',
    'Send Mail success',
    'Link has expired, please resend request',
    'Token had already changed!! Please login again',
    'Cannot control device when device inactive',
    'Cannot set schedule for the device because it is already in a group',
    'Cannot set schedules for devices in this group because it contains subgroups',
    'No commands to handle',
    'Send Command Success',
    'The Dashboard already exists',
    'Group not found',
    'Device already exist',
    'List device ids not found',
    'Feature energy or water already exists',
    'Feature not found',
    'Group already exists',
    "Group's type invalid",
    'Please upload an image of the map for the local group',
    'Parents group not found',
    'Group already conflicted',
    'A group cannot be set as its own destination',
    'List ids invalid',
    'List group ids not found',
    'Interface already exists',
    'Interface already conflicted',
    'Interface not found',
    'Energy source already exists',
    'Energy source already conflicted',
    'Energy source not found',
    "Tag's icon is required",
    'Tenant not found',
    'Tag already exists',
    'Tag already conflicted',
    'Tag not found',
    'Name already exists',
    'Tenant name already exists',
    'Tenant already exists',
    'User id Invalid',
    'Email already exists',
    'User conflicted',
    'Current password incorrect',
    'Confirm password does not match',
    'User id is required',
    'Permission invalid',
    'Value of Permission invalid',
    'Email must be valid',
    'Password must be at least 8 characters long',
    'Password must contain at least one uppercase letter',
    'Password must contain at least one lowercase letter',
    'Password must contain at least one special character',
    'Password must not contain spaces',
    'Password is required',
    'Passwords do not match',
    'Name is required',
    'Name must be string',
    'Name must contain only letters and spaces',
    'Invalid id data',
    'Invalid key search',
    'Device id is required',
    'Device id must be string',
    'Device id must be hex',
    'Device ID must contain at least 15 characters and at most 16 characters',
    'Tag is required',
    'Tag must be string',
    'Latitude invalid',
    'Longitude invalid',
    'Type is required',
    'Type must be string',
    'Features invalid',
    'List device ids must contain at least one item',
    'Emission factor must be number',
    'Emission factor must be float and greater than 0.2 ton',
    'Reference price must be number',
    'Id source type is required',
    'Phone number invalid',
    'Role must be string',
    'Permissions must be array',
];

const stringCase = {
    snake: '_',
    kebab: '-',
    title: ' ',
    sentence: ' ',
};

const caseTransform = {
    camel: (x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase(),
    pascal: (x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase(),
    snake: (x) => x.toLowerCase(),
    kebab: (x) => x.toLowerCase(),
    title: (x) => x.slice(0, 1).toUpperCase() + x.slice(1),
    sentence: (x) => x,
};

const convertCase = (str = '', toCase = 'camel') => {
    if (!str) return '';

    const delimiter = stringCase[toCase] ?? '';

    const words = str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );

    const finalTransform =
        toCase === 'camel'
            ? (x) => x.slice(0, 1).toLowerCase() + x.slice(1)
            : toCase === 'sentence'
            ? (x) => x.slice(0, 1).toUpperCase() + x.slice(1)
            : (x) => x;

    return finalTransform(words.map(caseTransform[toCase]).join(delimiter));
};

const handleArrJSON = (arrMessages) => {
    if (!arrMessages?.length) return [];

    const dataArr = [...new Set(arrMessages)];

    const output = {};

    for (const item of dataArr) {
        const key = item;

        output[key] = item;
    }

    console.log(JSON.stringify(output));

    return JSON.stringify(output);
};

handleArrJSON(arrMessages);
