import { Component, OnInit } from '@angular/core';
import { ProfileInfoService } from 'src/app/services/profile-info.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/entities/city';
import { CityService } from 'src/app/services/city.service';
import { ProfileInfoDetailsDto } from 'src/app/models/dtos/profileInfoDetailsDto';
import { TokenService } from 'src/app/services/token.service';
import { User } from 'src/app/models/entities/user';
import { ProfileInfo } from 'src/app/models/entities/profileInfo';

@Component({
  selector: 'app-profile-info-update',
  templateUrl: './profile-info-update.component.html',
  styleUrls: ['./profile-info-update.component.css'],
})
export class ProfileInfoUpdateComponent implements OnInit {
  profileInfoUpdateForm: FormGroup = {} as FormGroup;
  dateOfBirth: NgbDateStruct;
  cities: City[] = [];
  profileInfo: ProfileInfoDetailsDto = {} as ProfileInfoDetailsDto;
  user: User;

  constructor(
    private profileInfoService: ProfileInfoService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUserWithJWT();
    this.getAllCities();
    this.getProfileInfoByUser();
  }

  getProfileInfoByUser() {
    this.profileInfoService
      .getDetailsByUser(this.user.id)
      .subscribe((response) => {
        this.profileInfo = response.data;
        this.createProfileInfoUpdateForm();
      });
  }

  getAllCities() {
    this.cityService.getAll().subscribe((response) => {
      this.cities = response.data;
    });
  }

  createProfileInfoUpdateForm() {
    this.profileInfoUpdateForm = this.formBuilder.group({
      about: [''], // this.profileInfo.profileInfo.about ?? ''
      dateOfBirth: [new Date()], // this.profileInfo.profileInfo.dateOfBirth ?? new Date()
      graduatedSchool: [''], // this.profileInfo.graduatedSchool.name ?? ''
      livingCityId: [0], // this.profileInfo.profileInfo.livingCityId ?? 0
      socialLinks: [''], // this.profileInfo.profileInfo.socialLinks ?? ''
    });
  }

  getDate(): Date {
    let dateOfBirth: Date = new Date();
    dateOfBirth.setDate(this.dateOfBirth.day);
    dateOfBirth.setMonth(this.dateOfBirth.month);
    dateOfBirth.setFullYear(this.dateOfBirth.year);
    return dateOfBirth;
  }

  update() {
    if (this.profileInfoUpdateForm.valid) {
      let profileInfoModel: ProfileInfo = Object.assign(
        {},
        this.profileInfoUpdateForm.value
      );
      profileInfoModel.dateOfBirth = this.getDate();
      profileInfoModel.userId = this.user.id;
      console.log(profileInfoModel);
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
