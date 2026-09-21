// Renderiza una página local con WebKit (motor de Safari) y guarda un PNG.
// Uso: swift captura.swift <archivo.html> <salida.png> <ancho> <alto> <espera_s> [js]
import Foundation
import WebKit
import AppKit

let a = CommandLine.arguments
let archivo = URL(fileURLWithPath: a[1])
let salida  = URL(fileURLWithPath: a[2])
let ancho   = Double(a[3])!, alto = Double(a[4])!
let espera  = Double(a[5])!
let js      = a.count > 6 ? a[6] : ""
let postEspera = a.count > 7 ? Double(a[7])! : 1.6

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

let cfg = WKWebViewConfiguration()
let rect = CGRect(x: 0, y: 0, width: ancho, height: alto)
let web = WKWebView(frame: rect, configuration: cfg)

let win = NSWindow(contentRect: rect, styleMask: [.borderless],
                   backing: .buffered, defer: false)
win.contentView = web
win.orderBack(nil)

class Delegado: NSObject, WKNavigationDelegate {
    var listo = false
    func webView(_ w: WKWebView, didFinish n: WKNavigation!) { listo = true }
}
let del = Delegado()
web.navigationDelegate = del

web.loadFileURL(archivo, allowingReadAccessTo: archivo.deletingLastPathComponent())

// Esperamos a que cargue
let limite = Date().addingTimeInterval(20)
while !del.listo && Date() < limite {
    RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05))
}

func esperar(_ s: Double) {
    let fin = Date().addingTimeInterval(s)
    while Date() < fin { RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05)) }
}

esperar(espera)

if !js.isEmpty {
    var hecho = false
    web.evaluateJavaScript(js) { res, err in
        if let e = err { print("JS ERROR: \(e)") }
        if let r = res { print("JS → \(r)") }
        hecho = true
    }
    while !hecho { RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05)) }
    esperar(postEspera)   // que terminen las animaciones
}

var guardado = false
let conf = WKSnapshotConfiguration()
conf.rect = CGRect(x: 0, y: 0, width: ancho, height: alto)
web.takeSnapshot(with: conf) { img, err in
    defer { guardado = true }
    guard let img = img, let tiff = img.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else {
        FileHandle.standardError.write("no se pudo capturar\n".data(using: .utf8)!); return
    }
    try? png.write(to: salida)
    print("capturado: \(salida.lastPathComponent)")
}
while !guardado { RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05)) }
