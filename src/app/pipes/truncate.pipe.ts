import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 80): string {
    const trail = '...';
    return value?.length > limit ? value?.substring(0, limit) + trail : value;
  }
}
