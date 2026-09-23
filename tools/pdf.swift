// Genera un PDF desde un HTML usando WebKit (el motor de Safari).
// Uso: swift tools/pdf.swift <entrada.html> <salida.pdf> <ancho_px> <alto_px> <espera_s>
import Foundation
import WebKit
import AppKit

let a = CommandLine.arguments
let archivo = URL(fileURLWithPath: a[1])
let salida  = URL(fileURLWithPath: a[2])
let ancho   = Double(a[3])!, alto = Double(a[4])!
let espera  = a.count > 5 ? Double(a[5])! : 3.0

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

let rect = CGRect(x: 0, y: 0, width: ancho, height: alto)
let web  = WKWebView(frame: rect, configuration: WKWebViewConfiguration())
let win  = NSWindow(contentRect: rect, styleMask: [.borderless], backing: .buffered, defer: false)
win.contentView = web
win.orderBack(nil)

class Delegado: NSObject, WKNavigationDelegate {
    var listo = false
    func webView(_ w: WKWebView, didFinish n: WKNavigation!) { listo = true }
}
let del = Delegado()
web.navigationDelegate = del
web.loadFileURL(archivo, allowingReadAccessTo: archivo.deletingLastPathComponent())

func correr(_ s: Double) {
    let fin = Date().addingTimeInterval(s)
    while Date() < fin { RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05)) }
}
let limite = Date().addingTimeInterval(25)
while !del.listo && Date() < limite {
    RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05))
}
correr(espera)

var hecho = false
let cfg = WKPDFConfiguration()
cfg.rect = rect
web.createPDF(configuration: cfg) { res in
    defer { hecho = true }
    switch res {
    case .success(let datos):
        try? datos.write(to: salida)
        print("PDF generado: \(salida.lastPathComponent)  ·  \(datos.count / 1024) KB")
    case .failure(let e):
        print("ERROR: \(e)")
    }
}
while !hecho { RunLoop.main.run(mode: .default, before: Date().addingTimeInterval(0.05)) }
