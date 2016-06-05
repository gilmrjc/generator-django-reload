import re
from django.utils.html import strip_spaces_between_tags
from django.conf import settings

RE_MULTISPACE = re.compile(r'\s{2,}')
RE_NEWLINE = re.compile(r'\n')

class MinifyHtmlMiddleware(object):
    def process_response(self, request, response):
        try:
            if 'text/html' in response['Content-Type'] and settings.MINIFY_HTML:
                content = response.content.decode('utf-8')
                content = strip_spaces_between_tags(content.strip())
#                content = RE_MULTISPACE.sub(" ", content)
#                content = RE_NEWLINE.sub("", content)
                response.content = content.encode('utf-8')
        except AttributeError:
            response.content = strip_spaces_between_tags(response.content.strip())
#            response.content = RE_MULTISPACE.sub(" ", response.content)
#            response.content = RE_NEWLINE.sub("", response.content)
        except KeyError:
            pass
        return response
