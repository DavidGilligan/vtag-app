import { useState } from 'react'
import { Camera, FileText, Calendar, CheckCircle, Loader2 } from 'lucide-react'
import { createWorker } from 'tesseract.js'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

type ExtractedDocument = {
  documentType: string
  dateFound: string
  mileage: string
  garageName: string
  summary: string[]
}

function extractDocumentData(text: string): ExtractedDocument {
  const lowerText = text.toLowerCase()

  const dateMatch = text.match(
    /\b(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})\b/
  )

  const mileageMatch = text.match(
    /\b(\d{1,3}(?:,\d{3})+|\d{4,6})\s?(miles|mi|mileage)?\b/i
  )

  let documentType = 'Vehicle Document'

  if (lowerText.includes('service')) {
    documentType = 'BMW Service Record'
  } else if (lowerText.includes('mot')) {
    documentType = 'MOT Certificate'
  } else if (lowerText.includes('invoice')) {
    documentType = 'Invoice'
  } else if (lowerText.includes('receipt')) {
    documentType = 'Receipt'
  }

  const summary: string[] = []

  if (lowerText.includes('oil')) {
    summary.push('Engine oil replaced with BMW-approved synthetic oil.')
  }

  if (lowerText.includes('filter')) {
    summary.push('Oil filter, air filter or cabin filter checked/replaced.')
  }

  if (lowerText.includes('microfilter') || lowerText.includes('pollen')) {
    summary.push('Microfilter / cabin pollen filter replaced.')
  }

  if (lowerText.includes('brake')) {
    summary.push('Brake pads, discs or brake fluid inspected.')
  }

  if (lowerText.includes('tyre') || lowerText.includes('tire')) {
    summary.push('Tyre tread depth and tyre pressures checked.')
  }

  if (lowerText.includes('spark')) {
    summary.push('Spark plugs inspected or replaced.')
  }

  if (lowerText.includes('coolant')) {
    summary.push('Coolant level checked and topped up where required.')
  }

  if (lowerText.includes('diagnostic') || lowerText.includes('fault')) {
    summary.push('BMW diagnostic scan completed.')
  }

  if (summary.length === 0) {
    summary.push('Document scanned successfully. Manual review recommended.')
  }

  return {
    documentType,
    dateFound: dateMatch ? dateMatch[0] : 'Date not detected',
    mileage: mileageMatch ? `${mileageMatch[1]} miles` : 'Mileage not detected',
    garageName: 'Garage not detected',
    summary,
  }
}

function Scan() {
  const [preview, setPreview] = useState<string | null>(null)
  const [ocrText, setOcrText] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [logged, setLogged] = useState(false)
  const [documentData, setDocumentData] = useState<ExtractedDocument | null>(null)

  async function runOcr(imageUrl: string) {
    setIsScanning(true)
    setOcrText('')
    setDocumentData(null)

    const worker = await createWorker('eng')

    try {
      const result = await worker.recognize(imageUrl)
      const extractedText = result.data.text

      setOcrText(extractedText)
      setDocumentData(extractDocumentData(extractedText))
    } catch (error) {
      console.error(error)
      setOcrText('Unable to read text from this image.')
      setDocumentData(null)
    } finally {
      await worker.terminate()
      setIsScanning(false)
    }
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
    setLogged(false)
    runOcr(imageUrl)
  }

  function handleLogDocument() {
    setLogged(true)
  }

  return (
    <main className="min-h-screen bg-[#050606] pb-28 text-white">
      <Header />

      <section className="px-5 pt-6">
        <p className="text-xs tracking-widest text-zinc-500">
          DOCUMENT SCAN
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          SCAN DOCUMENT
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Scan service records, MOT documents, receipts, invoices, and ownership paperwork.
        </p>
      </section>

      <section className="mt-6 px-5">
        <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 p-6 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Uploaded document"
              className="max-h-[260px] rounded-2xl object-contain"
            />
          ) : (
            <>
              <div className="rounded-full bg-zinc-800 p-5">
                <Camera size={34} />
              </div>

              <h2 className="mt-4 text-lg font-bold">
                Tap to scan or upload
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Upload a photo of a vehicle document
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </section>

      {preview && (
        <section className="mt-5 px-5">
          <div className="rounded-3xl bg-zinc-900 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-800 p-3">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="font-bold">Extracted Document</h2>
                <p className="text-sm text-zinc-400">
                  {isScanning ? 'Reading document text...' : 'OCR scan complete'}
                </p>
              </div>
            </div>

            {isScanning && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-zinc-800 p-4 text-zinc-300">
                <Loader2 className="animate-spin" size={20} />
                <p className="text-sm">Scanning image for readable text...</p>
              </div>
            )}

            {!isScanning && ocrText && (
              <div className="mt-5 rounded-2xl bg-zinc-800 p-4">
                <p className="text-xs text-zinc-500">TEXT FOUND</p>

                <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-zinc-300">
                  {ocrText}
                </p>
              </div>
            )}

            {documentData && (
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-zinc-800 p-4">
                  <p className="text-xs text-zinc-500">DOCUMENT TYPE</p>
                  <p className="mt-1 font-semibold">{documentData.documentType}</p>
                </div>

                <div className="rounded-2xl bg-zinc-800 p-4">
                  <p className="text-xs text-zinc-500">DATE FOUND</p>
                  <p className="mt-1 font-semibold">{documentData.dateFound}</p>
                </div>

                <div className="rounded-2xl bg-zinc-800 p-4">
                  <p className="text-xs text-zinc-500">MILEAGE</p>
                  <p className="mt-1 font-semibold">{documentData.mileage}</p>
                </div>

                <div className="rounded-2xl bg-zinc-800 p-4">
                  <p className="text-xs text-zinc-500">GARAGE</p>
                  <p className="mt-1 font-semibold">{documentData.garageName}</p>
                </div>

                <div className="rounded-2xl bg-zinc-800 p-4">
                  <p className="text-xs text-zinc-500">SERVICE SUMMARY</p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                    {documentData.summary.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              onClick={handleLogDocument}
              disabled={!documentData}
              className="mt-5 w-full rounded-2xl bg-white py-4 font-bold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              Log to Timeline
            </button>
          </div>
        </section>
      )}

      {logged && documentData && (
        <section className="mt-5 px-5">
          <div className="flex items-center gap-3 rounded-2xl bg-green-900/30 p-4 text-green-400">
            <CheckCircle size={22} />
            <p className="text-sm font-semibold">
              Document logged to vehicle timeline
            </p>
          </div>
        </section>
      )}

      <section className="mt-6 px-5">
        <div className="rounded-3xl bg-zinc-900 p-5">
          <div className="mb-4 flex items-center gap-3">
            <Calendar size={22} />
            <h2 className="font-bold">Timeline Preview</h2>
          </div>

          <div className="border-l border-zinc-700 pl-4">
            <div>
              <p className="text-sm font-semibold">
                {documentData?.dateFound || 'Awaiting scan'}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                {documentData
                  ? `${documentData.documentType} - ${documentData.summary[0]}`
                  : 'Scan a document to generate a timeline entry'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}

export default Scan