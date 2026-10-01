"use client"

import { useState } from "react"
import { Signature } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { TabsContent } from "@/components/ui/tabs"
import { UnderlineTabs } from "@/components/underline-tabs"
import { StampUploadField } from "@/components/stamp-upload-field"
import { SignaturePad } from "@/components/signature-pad"

const signatureTabs = [
  { name: "手寫簽名", value: "handwritten" },
  { name: "圖章", value: "stamp" },
]

function ElectronicSignatureSection({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-medium text-black">電子簽章</h2>
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-col items-center justify-center gap-2 w-full h-40 rounded-lg bg-muted text-muted-foreground hover:bg-muted/70 transition-colors cursor-pointer"
      >
        <Signature className="size-6" />
        <span className="text-sm font-medium">設定電子簽章</span>
      </button>
    </div>
  )
}

export function PaymentSettingsSection() {
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("handwritten")

  return (
    <div className="flex flex-col gap-6 px-6 pb-6">
      <ElectronicSignatureSection onOpen={() => setSignatureDialogOpen(true)} />

      <Dialog open={signatureDialogOpen} onOpenChange={setSignatureDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[448px] max-w-[448px] sm:max-w-[448px] p-0 gap-0 rounded-[10px] overflow-hidden"
        >
          <DialogTitle className="sr-only">電子簽章</DialogTitle>

          <UnderlineTabs tabs={signatureTabs} value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="handwritten" className="p-6">
              <SignaturePad />
            </TabsContent>
            <TabsContent value="stamp" className="p-6">
              <StampUploadField
                onCancel={() => setSignatureDialogOpen(false)}
                onConfirm={() => setSignatureDialogOpen(false)}
              />
            </TabsContent>
          </UnderlineTabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
