import http.server
import socketserver
import os
import sys

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Intercept and strip the Next.js basePath prefix for local testing
        prefix = "/internationalconference"
        if path.startswith(prefix):
            path = path[len(prefix):]
            if not path:
                path = "/"
        return super().translate_path(path)

# Ensure Python runs from the directory containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Set server configurations
handler = MyHTTPRequestHandler
socketserver.TCPServer.allow_reuse_address = True

print("-" * 65)
print("  ICTAGI 2026 - LOCAL DEV SERVER")
print("-" * 65)
print(f"  Serving files from: {script_dir}")
print(f"  Local testing URL : http://localhost:{PORT}/internationalconference/index.html")
print("-" * 65)
print("  Press Ctrl+C to stop the server.\n")

try:
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nStopping server. Goodbye!")
    sys.exit(0)
except Exception as e:
    print(f"Error starting server: {e}")
    sys.exit(1)
