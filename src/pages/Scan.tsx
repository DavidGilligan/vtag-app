import { useEffect, useState } from 'react'
import {
  BadgeIcon,
  Camera,
  Car,
  CheckCircle,
  ClipboardList,
  FileText,
  Gauge,
  Glasses,  
  HeartHandshake,
  Loader2,
  MemoryStick,
  ReceiptText,
  Search,
  ShieldCheck,
  SmartphoneNfc,
  Sparkles,
  Tag,
  Wrench,
  X,
} from 'lucide-react'
import { createWorker } from 'tesseract.js'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

type ScanMode = 'vtag' | 'document' | 'registration'

type ExtractedDocument = {
  documentType: string
  dateFound: string
  mileage: string
  garageName: string
  summary: string[]
}

type VtagLookupResult = {
  id: string
  vehicleId: string
  referenceCode: string
  status: string
  vehicle: {
    id: string
    make: string
    model: string
    registration: string | null
    vin: string | null
    verificationStatus: string
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const documentTypes = [
  { title: 'MOT Certificate', icon: <ClipboardList size={24} /> },
  { title: 'Servicing Record', icon: <Wrench size={24} /> },
  { title: 'Tyre/Wheel Replacement', icon: <Gauge size={24} /> },
  { title: 'Windscreen Repair', icon: <Glasses size={24} /> },
  { title: 'Self-Maintenance', icon: <MemoryStick size={24} /> },
  { title: 'Modifications', icon: <Sparkles size={24} /> },
  { title: 'Memorabilia', icon: <HeartHandshake size={24} /> },
  { title: 'Insurance Documents', icon: <ShieldCheck size={24} /> },
  { title: 'Tax & Registration', icon: <ReceiptText size={24} /> },
]

async function preprocessImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageUrl

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas is not supported'))
        return
      }

      const maxWidth = 1400
      const scale = image.width > maxWidth ? maxWidth / image.width : 1

      canvas.width = image.width * scale
      canvas.height = image.height * scale

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const histogram = new Array(256).fill(0)
      const greyValues: number[] = []

      for (let i = 0; i < data.length; i += 4) {
        const grey = Math.round(
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        )

        greyValues.push(grey)
        histogram[grey] += 1
      }

      const totalPixels = greyValues.length
      let sum = 0

      for (let i = 0; i < 256; i += 1) {
        sum += i * histogram[i]
      }

      let sumBackground = 0
      let weightBackground = 0
      let maxVariance = 0
      let threshold = 127

      for (let i = 0; i < 256; i += 1) {
        weightBackground += histogram[i]

        if (weightBackground === 0) continue

        const weightForeground = totalPixels - weightBackground

        if (weightForeground === 0) break

        sumBackground += i * histogram[i]

        const meanBackground = sumBackground / weightBackground
        const meanForeground = (sum - sumBackground) / weightForeground

        const variance =
          weightBackground *
          weightForeground *
          Math.pow(meanBackground - meanForeground, 2)

        if (variance > maxVariance) {
          maxVariance = variance
          threshold = i
        }
      }

      for (let i = 0; i < data.length; i += 4) {
        const grey = Math.round(
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        )

        const value = grey > threshold ? 255 : 0

        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
      }

      ctx.putImageData(imageData, 0, 0)

      resolve(canvas.toDataURL('image/png'))
    }

    image.onerror = () => {
      reject(new Error('Image failed to load'))
    }
  })
}

function extractDocumentData(text: string): ExtractedDocument {
  const lowerText = text.toLowerCase()

  const dateMatch = text.match(
    /\b(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})\b/
  )

  const mileageKeywords = [
    /mileage[:\s]*([0-9,]+)/i,
    /odometer[:\s]*([0-9,]+)/i,
    /miles[:\s]*([0-9,]+)/i,
    /current mileage[:\s]*([0-9,]+)/i,
  ]

  let mileage = 'Mileage not detected'

  for (const pattern of mileageKeywords) {
    const match = text.match(pattern)

    if (match?.[1]) {
      mileage = `${match[1]} miles`
      break
    }
  }

  let documentType = 'Vehicle Document'

  if (lowerText.includes('invoice')) {
    documentType = 'Invoice'
  } else if (lowerText.includes('service')) {
    documentType = 'Service Record'
  } else if (lowerText.includes('mot')) {
    documentType = 'MOT Certificate'
  } else if (lowerText.includes('receipt')) {
    documentType = 'Receipt'
  }

  let garageName = 'Garage not detected'

  if (lowerText.includes('range rover')) {
    garageName = 'Range Rover / Land Rover'
  } else if (lowerText.includes('john clark')) {
    garageName = 'John Clark BMW Aberdeen'
  } else if (lowerText.includes('bmw')) {
    garageName = 'BMW Service Centre'
  }

  const summary: string[] = []

  if (lowerText.includes('castrol')) {
    summary.push('Castrol-approved oil or lubricant identified on the document.')
  }

  if (lowerText.includes('oil')) {
    summary.push('Engine oil or lubricant-related item detected.')
  }

  if (lowerText.includes('labour') || lowerText.includes('labor')) {
    summary.push('Labour charge detected on the invoice.')
  }

  if (lowerText.includes('vat')) {
    summary.push('VAT line detected on the invoice.')
  }

  if (lowerText.includes('invoice')) {
    summary.push('Invoice document detected. Manual review recommended for itemised costs.')
  }

  if (summary.length === 0) {
    summary.push('Document scanned successfully. Manual review recommended.')
  }

  return {
    documentType,
    dateFound: dateMatch ? dateMatch[0] : 'Date not detected',
    mileage,
    garageName,
    summary,
  }
}

function Scan() {
  const [searchParams] = useSearchParams()
  const [activeMode, setActiveMode] = useState<ScanMode>('vtag')
  const [selectedDocumentType, setSelectedDocumentType] = useState('')
  const [passItOnOpen, setPassItOnOpen] = useState(false)
  const [referenceSearch, setReferenceSearch] = useState('')
  const [vtagResult, setVtagResult] = useState<VtagLookupResult | null>(null)
  const [vtagError, setVtagError] = useState('')
  const [isLookingUpVtag, setIsLookingUpVtag] = useState(false)
  const [registrationSearch, setRegistrationSearch] = useState('')
  const [registrationResult, setRegistrationResult] = useState<any>(null)
  const [registrationError, setRegistrationError] = useState('')

  const [preview, setPreview] = useState<string | null>(null)
  const [ocrText, setOcrText] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [logged, setLogged] = useState(false)
  const [documentData, setDocumentData] = useState<ExtractedDocument | null>(null)

  useEffect(() => {
    const referenceFromUrl = searchParams.get('ref')

    if (!referenceFromUrl) return

    setActiveMode('vtag')
    setReferenceSearch(referenceFromUrl)
    handleReferenceLookup(referenceFromUrl)
  }, [searchParams])

  async function handleRegistrationLookup() {
    if (!registrationSearch.trim()) return

    setRegistrationError('')
    setRegistrationResult(null)

    try {
      const response = await fetch(
        `${API_URL}/registration-lookup/${registrationSearch.trim()}`
      )

      if (!response.ok) {
        throw new Error('Registration lookup failed')
      }

      const data = await response.json()
      setRegistrationResult(data)
    } catch (error) {
      setRegistrationError('Unable to look up this registration.')
    }
  }

  async function handleReferenceLookup(referenceOverride?: string) {
    const reference = (referenceOverride || referenceSearch).trim().toUpperCase()

    if (!reference) return

    setVtagError('')
    setVtagResult(null)
    setIsLookingUpVtag(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/vtags/reference/${encodeURIComponent(reference)}`
      )

      if (!response.ok) {
        throw new Error('V-TAG reference not found')
      }

      const data = await response.json()
      setVtagResult(data)
    } catch (error) {
      console.error(error)
      setVtagError('Unable to find this V-TAG reference.')
    } finally {
      setIsLookingUpVtag(false)
    }
  }

  async function runOcr(imageUrl: string) {
    setIsScanning(true)
    setOcrText('')
    setDocumentData(null)

    const worker = await createWorker('eng')

    try {
      const cleanedImage = await preprocessImage(imageUrl)

      const result = await worker.recognize(cleanedImage)

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
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-2">
          <p className="theme-subtle text-xs tracking-widest">SCAN</p>
          <h1 className="mt-1 text-3xl font-bold">SCAN CENTRE</h1>
          <p className="theme-muted mt-2 text-sm">
            Scan V-Tags, upload vehicle documents, or search registration history.
          </p>
        </section>

        <section className="mt-6 space-y-3 px-5">
          <ScanOption
            active={activeMode === 'vtag'}
            icon={<SmartphoneNfc size={24} />}
            title="Scan a V-Tag"
            caption="Scan a V-Tag on an existing vehicle"
            onClick={() => setActiveMode('vtag')}
          />

          <ScanOption
            active={activeMode === 'document'}
            icon={<FileText size={24} />}
            title="Scan a Document"
            caption="Scan a document for upload to your garage"
            onClick={() => setActiveMode('document')}
          />

          <ScanOption
            active={activeMode === 'registration'}
            icon={<BadgeIcon size={24} />}
            title="Scan a Registration"
            caption="Scan a car's registration to see history"
            onClick={() => setActiveMode('registration')}
          />
        </section>

        {activeMode === 'vtag' && (
          <section className="mt-6 px-5">
            <div className="theme-card rounded-3xl p-6 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-900/30 text-green-400">
                <SmartphoneNfc size={54} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">How to scan a V-Tag</h2>

              <p className="theme-muted mt-3 text-sm leading-6">
                Simply hover or touch the tag with the top of your phone. It will
                send you a reference to the vehicle.
              </p>

              <div className="theme-card-secondary mt-5 rounded-2xl p-4 text-left">
                <p className="font-semibold">Already have the reference?</p>

                <p className="theme-muted mt-1 text-sm">
                  You can also search if the user has their app handy and can provide the V-TAG reference.
                </p>

                <div className="theme-bg mt-4 flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Search size={18} />
                  <input
                    value={referenceSearch}
                    onChange={(event) => setReferenceSearch(event.target.value.toUpperCase())}
                    placeholder="Enter V-TAG reference"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <button
                  onClick={() => handleReferenceLookup()}
                  disabled={!referenceSearch.trim() || isLookingUpVtag}
                  className="mt-4 w-full rounded-2xl bg-green-500 py-3 font-bold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {isLookingUpVtag ? 'Searching...' : 'Search V-TAG'}
                </button>

                {vtagResult && (
                  <div className="mt-4 rounded-2xl bg-green-900/30 p-4 text-left">
                    <p className="text-sm font-bold text-green-400">
                      V-TAG Found
                    </p>

                    <p className="mt-2 font-semibold">
                      {vtagResult.vehicle.make} {vtagResult.vehicle.model}
                    </p>

                    <p className="theme-muted mt-1 text-sm">
                      Registration: {vtagResult.vehicle.registration || 'Not recorded'}
                    </p>

                    <p className="theme-muted mt-1 text-sm">
                      Reference: {vtagResult.referenceCode}
                    </p>

                    <p className="theme-muted mt-1 text-sm">
                      Status: {vtagResult.status}
                    </p>
                  </div>
                )}

                {vtagError && (
                  <p className="mt-4 text-sm text-red-400">
                    {vtagError}
                  </p>
                )}
              </div>

              <div className="theme-card-secondary mt-5 rounded-2xl p-4">
                <p className="font-semibold">No V-Tag on the vehicle?</p>

                <p className="theme-muted mt-1 text-sm">
                  Help another driver discover V-TAG.
                </p>

                <button
                  onClick={() => setPassItOnOpen(true)}
                  className="mt-4 w-full rounded-2xl bg-white py-3 font-bold text-black"
                >
                  Pass it on
                </button>
              </div>
            </div>
          </section>
        )}

        {activeMode === 'document' && (
          <>
            <section className="mt-6 px-5">
              <div className="theme-card rounded-3xl p-5">
                <p className="theme-subtle text-xs tracking-widest">
                  SELECT A DOCUMENT
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  What are you uploading?
                </h2>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {documentTypes.map((documentType) => (
                    <button
                      key={documentType.title}
                      onClick={() => setSelectedDocumentType(documentType.title)}
                      className={`theme-card-secondary flex min-h-28 flex-col items-center justify-center rounded-2xl p-3 text-center transition ${
                        selectedDocumentType === documentType.title
                          ? 'ring-2 ring-green-400'
                          : ''
                      }`}
                    >
                      {documentType.icon}
                      <span className="mt-2 text-[11px] font-semibold leading-tight">
                        {documentType.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {selectedDocumentType && (
              <section className="mt-5 px-5">
                <div className="theme-card rounded-3xl p-5">
                  <p className="theme-subtle text-xs tracking-widest">
                    SELECTED DOCUMENT
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {selectedDocumentType}
                  </h2>

                  <p className="theme-muted mt-2 text-sm">
                    Upload a photo or scan the document to extract text and add it to your garage.
                  </p>

                  <label className="theme-card-secondary mt-5 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center theme-border">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Uploaded document"
                        className="max-h-[260px] rounded-2xl object-contain"
                      />
                    ) : (
                      <>
                        <div className="theme-bg rounded-full p-5">
                          <Camera size={34} />
                        </div>

                        <h3 className="mt-4 text-lg font-bold">
                          Tap to scan or upload
                        </h3>

                        <p className="theme-muted mt-2 text-sm">
                          Upload a photo of your {selectedDocumentType.toLowerCase()}
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
                </div>
              </section>
            )}

            {preview && (
              <section className="mt-5 px-5">
                <div className="theme-card rounded-3xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="theme-card-secondary rounded-xl p-3">
                      <FileText size={22} />
                    </div>

                    <div>
                      <h2 className="font-bold">Extracted Document</h2>
                      <p className="theme-muted text-sm">
                        {isScanning ? 'Reading document text...' : 'OCR scan complete'}
                      </p>
                    </div>
                  </div>

                  {isScanning && (
                    <div className="theme-card-secondary mt-5 flex items-center gap-3 rounded-2xl p-4">
                      <Loader2 className="animate-spin" size={20} />
                      <p className="text-sm">Scanning image for readable text...</p>
                    </div>
                  )}

                  {!isScanning && ocrText && (
                    <div className="theme-card-secondary mt-5 rounded-2xl p-4">
                      <p className="theme-subtle text-xs">TEXT FOUND</p>

                      <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm">
                        {ocrText}
                      </p>
                    </div>
                  )}

                  {documentData && (
                    <div className="mt-5 space-y-3">
                      <DataTile label="Document Type" value={selectedDocumentType || documentData.documentType} />
                      <DataTile label="Date Found" value={documentData.dateFound} />
                      <DataTile label="Mileage" value={documentData.mileage} />
                      <DataTile label="Garage" value={documentData.garageName} />

                      <div className="theme-card-secondary rounded-2xl p-4">
                        <p className="theme-subtle text-xs">SERVICE SUMMARY</p>

                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
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
                    Log to Garage
                  </button>
                </div>
              </section>
            )}

            {logged && documentData && (
              <section className="mt-5 px-5">
                <div className="flex items-center gap-3 rounded-2xl bg-green-900/30 p-4 text-green-400">
                  <CheckCircle size={22} />
                  <p className="text-sm font-semibold">
                    Document logged to your garage
                  </p>
                </div>
              </section>
            )}
          </>
        )}

        {activeMode === 'registration' && (
          <section className="mt-6 px-5">
            <div className="theme-card rounded-3xl p-5">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-900/30 text-orange-400">
                <Car size={46} />
              </div>

              <h2 className="mt-5 text-center text-2xl font-bold">
                Scan a Registration
              </h2>

              <p className="theme-muted mt-3 text-center text-sm leading-6">
                Enter or scan a registration plate to preview vehicle history and public records.
              </p>

              <div className="theme-card-secondary mt-5 flex items-center gap-3 rounded-2xl px-4 py-3">
                <Tag size={18} />
                <input
                  value={registrationSearch}
                  onChange={(event) => setRegistrationSearch(event.target.value.toUpperCase())}
                  placeholder="AB12 CDE"
                  className="w-full bg-transparent text-center text-lg font-bold tracking-widest outline-none"
                />
              </div>
              
              <button
                onClick={handleRegistrationLookup}
                className="mt-5 w-full rounded-2xl bg-white py-4 font-bold text-black"
              >
                Search Registration
              </button>

             {registrationResult && (
               <div className="theme-card-secondary mt-5 rounded-2xl p-4">
                 <p className="theme-subtle text-xs tracking-widest">
                   REGISTRATION RESULT
                 </p>
             
                 <p className="mt-2 font-bold">
                   {registrationResult.vehicle.make} {registrationResult.vehicle.model}
                 </p>
             
                 <p className="theme-muted mt-1 text-sm">
                   Registration: {registrationResult.registration}
                 </p>
             
                 <p className="theme-muted mt-1 text-sm">
                   V-TAGged: {registrationResult.vtag.isTagged ? 'Yes' : 'No'}
                 </p>
             
                 {registrationResult.vtag.referenceCode && (
                   <p className="theme-muted mt-1 text-sm">
                     V-TAG Reference: {registrationResult.vtag.referenceCode}
                   </p>
                 )}
             
                 <p className="theme-muted mt-1 text-sm">
                   Latest MOT mileage: {registrationResult.mileage.latestMotMileage ?? 'Unknown'}
                 </p>
               
                 <p className="theme-muted mt-1 text-sm">
                   Estimated mileage: {registrationResult.mileage.estimatedMileage ?? 'Unknown'}
                 </p>
               
                 <p className="mt-3 font-semibold">
                   Latest MOT Status: {registrationResult.mot.latestStatus ?? 'Unknown'}
                 </p>
               </div>
             )}
             
             {registrationError && (
               <p className="mt-4 text-sm text-red-400">{registrationError}</p>
             )}
            </div>
          </section>
        )}

        {passItOnOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
            <div className="theme-card w-full max-w-sm rounded-3xl p-6 text-center">
              <button
                onClick={() => setPassItOnOpen(false)}
                className="theme-card-secondary ml-auto flex rounded-full p-2"
              >
                <X size={20} />
              </button>

              <div className="mx-auto mt-2 flex h-24 w-24 items-center justify-center rounded-full bg-green-900/30 text-green-400">
                <SmartphoneNfc size={48} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">Pass it on</h2>

              <p className="theme-muted mt-3 text-sm leading-6">
                Hold your phone end-to-end with the other user's phone to share
                the magic of V-TAG.
              </p>

              <button
                onClick={() => setPassItOnOpen(false)}
                className="mt-6 w-full rounded-2xl bg-white py-3 font-bold text-black"
              >
                Done
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </main>
    </AppShell>
  )
}

type ScanOptionProps = {
  active: boolean
  icon: React.ReactNode
  title: string
  caption: string
  onClick: () => void
}

function ScanOption({ active, icon, title, caption, onClick }: ScanOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`theme-card flex w-full items-center gap-4 rounded-3xl p-5 text-left transition ${
        active ? 'ring-2 ring-green-400' : ''
      }`}
    >
      <div className="theme-card-secondary rounded-2xl p-3">
        {icon}
      </div>

      <div>
        <h2 className="font-bold">{title}</h2>

        <p className="theme-muted mt-1 text-sm">
          {caption}
        </p>
      </div>
    </button>
  )
}

type DataTileProps = {
  label: string
  value: string
}

function DataTile({ label, value }: DataTileProps) {
  return (
    <div className="theme-card-secondary rounded-2xl p-4">
      <p className="theme-subtle text-xs tracking-widest">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  )
}

export default Scan