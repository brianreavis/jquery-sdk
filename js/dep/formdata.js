/** @license FormData: Copyright (c) 2010 François de Metz | MIT License: http://www.opensource.org/licenses/mit-license.php
*/
/**
 * Emulate FormData for some browsers
 * MIT License
 * (c) 2010 François de Metz
 */
(function(w) {
    if (w.FormData)
        return;
    function FormData() {
        this.fake = true;
        this.boundary = "--------FormData" + Math.random();
        this._fields = [];
    }
    FormData.prototype.append = function(key, value) {
        this._fields.push([key, value]);
    }
    FormData.prototype.toString = function() {
        var boundary = this.boundary;
        var body = "";
        this._fields.forEach(function(field) {
            body += "--" + boundary + "\r\n";
            // file upload
			if (field[1].name || field[1].fileName) {
                var file = field[1];
                var filename = field[1].name || field[1].fileName;
				var filetype = file.type || 'application/octet-stream';
				body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ filename +"\"\r\n";
                body += "Content-Type: "+ filetype +"\r\n\r\n";
                body += file.getAsBinary() + "\r\n";
            } else {
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
                body += field[1] + "\r\n";
            }
        });
        body += "--" + boundary +"--";
        return body;
    }
    w.FormData = FormData;
})(window);