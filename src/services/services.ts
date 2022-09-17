import RestClient from '@/utils/RestClient';

export const getProfile = async () => await RestClient('user/profile');
