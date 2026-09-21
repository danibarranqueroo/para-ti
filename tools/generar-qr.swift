// Genera el QR de la web con Core Image (viene con macOS).
// Uso:  swift tools/generar-qr.swift "https://…" salida.png
import Foundation
import CoreImage
import AppKit

let args = CommandLine.arguments
let texto = args.count > 1 ? args[1] : "https://danibarranqueroo.github.io/para-ti/"
let salida = args.count > 2 ? args[2] : "qr.png"

guard let filtro = CIFilter(name: "CIQRCodeGenerator") else { exit(1) }
filtro.setValue(texto.data(using: .utf8), forKey: "inputMessage")
filtro.setValue("H", forKey: "inputCorrectionLevel")   // H = aguanta arrugas y manchas

guard let salidaCI = filtro.outputImage else { exit(1) }
let escala: CGFloat = 24                                // ~1000 px: nítido al imprimir
let grande = salidaCI.transformed(by: CGAffineTransform(scaleX: escala, y: escala))

let ctx = CIContext()
guard let cg = ctx.createCGImage(grande, from: grande.extent) else { exit(1) }
let rep = NSBitmapImageRep(cgImage: cg)
guard let png = rep.representation(using: .png, properties: [:]) else { exit(1) }
try png.write(to: URL(fileURLWithPath: salida))
print("QR generado: \(salida)  ·  \(cg.width)×\(cg.height) px")
print("apunta a: \(texto)")
