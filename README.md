# Platform Tools

Provides Ionic Framework way class mapping of current platform and orientation on the root document node ´html´ for usage inside scss or :host-context selecting.

## Usage
Simply inject the service in your root app component and it will add classes to your document.
```typescript
import {PlatformToolsService} from "./platform-tools.service";

export class AppComponent {
  public constructor(
      // ... 
    private readonly platformService: PlatformToolsService
      // ... 
  ) {

  }
}

```
Now you're able to use `:host-context(.plt-tablet)` at Angular Component SCSS level for writing context based css,
or use at global.scss/style.scss as selector `.plt-tablet > app-component { ... }`.

### Available class selectors:
| Selector Name | Description                              |
|---------------|------------------------------------------|
| plt-android       | a device running Android                 |
| plt-desktop       | a desktop device                         |
| plt-ios           | a device running iOS                     |
| plt-ipad          | an iPad device                           |
| plt-iphone        | an iPhone device                         |
| plt-mobile        | a mobile device                          |
| plt-mobileweb     | a web browser running in a mobile device |
| plt-phablet       | a phablet device                         |
| plt-pwa           | a PWA app                                |
| plt-tablet        | a tablet device                          |
| is-landscape        | a device with landscape orientation                          |
| is-portrait        | a device  with portrait orientation                        |


## Example
Inside your Angular Component Stylesheet SCSS
```scss
:host {
  display: block;
  width: 100%;
  height: 100vh;
}

// set color of font to white on ios platform
:host-context(.plt-ios) {
  :host {
    color: white;
  }
}
// set background color to blue on tablet
:host-context(.plt-tablet) {
  :host {
    background-color: blue;
  }
  
  // set background color red if tablet and landscape
  :host-context(.is-landscape) {
    :host {
      background-color: red;
    }
  }
}


```
Or inside your style.scss / global.scss without `:host-context` since it is only
available inside component scss scopes.
```
html.plt-ios {
 // ... your rules
}

// or
.plt-tablet{

}
```
## Notes
Platform class mapping won't change if simply changing device emulator inside Chrome since platform evaluation is done only on boot. A Reload will be needed. Screen orientation will be update on screenorientation change by listening to the window resize event.

### Author
* [Sven Graziani](SGraziani@anexia-it.com)

### Credits
To the Ionic Framework core team for the inspiration.
