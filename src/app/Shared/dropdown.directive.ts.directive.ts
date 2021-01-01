import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector:'[appDropdown]'
})
export class DropdownDirective{
  @HostBinding('class.open') isright=false;
  @HostListener('click') onclick()
  {
    this.isright=!this.isright
  }
  
}