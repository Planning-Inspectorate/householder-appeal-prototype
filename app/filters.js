const moment = require('moment')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  filters.formatMonth = function(number){
    if(number){
      var date = moment().month(number -1)
      return date.format('MMMM')
    } else {
      return ""
    }
  }

  filters.formatDate = function(str,format) {
      var d = moment(str).format(format);
      if (d !== 'Invalid date') return d;
      else return '';
  }


  filters.daysAgo = function(num) {
      var d = moment().subtract(num,"days").format("D MMMM YYYY")
      if (d !== 'Invalid date') return d
      else return ''
  }

  filters.daysInFuture = function(num) {
      var d = moment().add(num,"days").format("D MMMM YYYY")
      if (d !== 'Invalid date') return d
      else return ''
  }


  filters.filesByFieldName = function(files, fieldname){
    if(!files || !fieldname){
      return "";
    } else {
      console.log(files);
      return files.filter(file => file.fieldname === fieldname)
    }
  }



  return filters
}
