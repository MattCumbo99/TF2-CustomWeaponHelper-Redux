import { Pipe, PipeTransform } from "@angular/core";

/**
 * Converts an enum to an array.
 */
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}
