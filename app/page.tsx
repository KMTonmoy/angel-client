import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DesignDemoPage() {
  return (
    <div className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Angel AI Design System
        </h1>
        <p className="text-lg text-muted-foreground">
          A preview of the typography, colors, and components using the soft
          pink theme.
        </p>
      </header>

      {/* Typography Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-2">
          1. Typography
        </h2>

        <div className="space-y-4">
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Heading 1
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight">
              The quick brown fox jumps over the lazy dog
            </h1>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Heading 2
            </span>
            <h2 className="text-3xl font-semibold tracking-tight">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Heading 3
            </span>
            <h3 className="text-2xl font-semibold tracking-tight">
              The quick brown fox jumps over the lazy dog
            </h3>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Heading 4
            </span>
            <h4 className="text-xl font-semibold tracking-tight">
              The quick brown fox jumps over the lazy dog
            </h4>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Paragraph (Base)
            </span>
            <p className="text-base leading-7">
              This is a standard paragraph. It uses the Geist font, which is
              highly legible and perfect for AI applications. The text color is
              a deep muted rose, ensuring it isnt too harsh on the eyes while
              maintaining excellent contrast against the soft pink background.{" "}
              <Link
                href="#"
                className="text-primary hover:underline font-medium"
              >
                This is a link
              </Link>{" "}
              inside the paragraph.
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">
              Muted Paragraph
            </span>
            <p className="text-sm text-muted-foreground">
              This is small muted text, used for timestamps, helper text, or
              secondary information.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-2">
          2. Buttons
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-2">
          3. Inputs & Forms
        </h2>
        <div className="max-w-sm space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" placeholder="hello@angel.ai" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>
      </section>

      {/* Cards & Surfaces Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-2">
          4. Cards & Surfaces
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Standard Card</h3>
            <p className="text-sm text-card-foreground/80">
              The card background is pure white, which pops nicely against the
              soft pink page background. The border is a soft pastel pink.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border bg-muted p-6">
            <h3 className="font-semibold text-lg mb-2">Muted Surface</h3>
            <p className="text-sm text-muted-foreground">
              This uses the muted background color, typically used for code
              blocks or secondary panels.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Bubbles Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-2">
          5. Chat Bubbles
        </h2>
        <div className="max-w-2xl space-y-4 bg-background/50 p-6 rounded-2xl border">
          {/* AI Message */}
          <div className="flex gap-3 justify-start">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
              AI
            </div>
            <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm">
              Hello! I am Angel AI. How can I help you with your documents
              today?
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
              Can you summarize the financial report I just uploaded?
            </div>
            <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs shrink-0">
              U
            </div>
          </div>

          {/* AI Message with Citation */}
          <div className="flex gap-3 justify-start">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
              AI
            </div>
            <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm w-full max-w-md">
              <p className="mb-2">
                Based on the document, the Q3 revenue grew by 12%.
              </p>
              <div className="bg-background/50 rounded p-2 text-xs border border-border/50">
                <span className="font-semibold block mb-1">Sources:</span>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>Page 4 - Financial Summary</li>
                  <li>Page 12 - Q3 Breakdown</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
