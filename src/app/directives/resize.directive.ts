import { Directive, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MobileService } from '../services/mobile.service';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appResize]',
  standalone: true,
})
export class ResizeDirective {
  constructor(
    private mobileService: MobileService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
    }
    this.mobileService.mobile.next(this.isMobile());
  }

  private width: number = 1920;
  resizeTOH: any;

  onMobile() {
    if (this.resizeTOH) clearTimeout(this.resizeTOH);
    this.resizeTOH = setTimeout(() => {
      this.mobileService.mobile.next(this.isMobile());
    }, 10);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
      this.onMobile();
    }
  }

  isMobile() {
    return this.width <= 760;
  }
}
