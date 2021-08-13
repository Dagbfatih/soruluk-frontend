import { Language } from "../entities/language";
import { Translate } from "../entities/translate";

export interface TranslateDetailsDto{
    translate:Translate;
    language:Language;
}