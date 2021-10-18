import { City } from '../entities/city';
import { ProfileInfo } from '../entities/profileInfo';
import { School } from '../entities/school';
import { Website } from '../entities/website';

export interface ProfileInfoDetailsDto {
  profileInfo: ProfileInfo;
  userName: string;
  graduatedSchool: School;
  livingCity: City;
  websites: Website[];
}
