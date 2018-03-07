# \<zdkelt-input-date\>

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/zedesk/zdkelt-input-date)
![](https://img.shields.io/badge/polymer-2.x-blue.svg)
![](https://img.shields.io/badge/licence-MIT-brightgreen.svg)

A calendar component, which could be used as date-picker

![zdk-input-date](hero.gif)

Use it :

```
<zdkelt-input-date init-date="2018-03-01" value="2018-03-25">
  <paper-button dropdown-dismiss>Cancel</paper-button>
  <paper-button dropdown-confirm>Valid</paper-button>
</zdkelt-input-date>
```

Example:

## Quick example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="zdkelt-input-date.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div style="height: 400px">
  <zdkelt-input-date i18n="en-US" init-date="2018-03-01" value="2018-03-25">
    <paper-button dropdown-dismiss>Cancel</paper-button>
    <paper-button dropdown-confirm>Valid</paper-button>
  </zdkelt-input-date>
</div>
```
