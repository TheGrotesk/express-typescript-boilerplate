import { IsDefined, IsString } from "class-validator";

export default class AppDto {
  @IsDefined()
  @IsString()
  testField = '';
}