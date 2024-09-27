# AVM-Fax-Multiple-Pictures
Tampermonkey User Script

Download the Browser Addon and import the user script.

The Script will add the multiple attribute to the Fritz!Box Fax Send page.

It replaces 

From
```javascript
<input type="file" id="uiFile" size="70" accept="image/*">
```

To
```javascript
<input type="file" id="uiFile" size="70" accept="image/*" multiple="multiple">
```
