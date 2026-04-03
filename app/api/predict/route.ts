import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import path from "node:path";

interface PredictPayload {
  amount: number;
  country: string;
  device_type: string;
  merchant_category: string;
}

function runPythonPredictor(payload: PredictPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    const workspaceRoot = process.cwd();
    const backendRoot = process.env.FRAUD_BACKEND_DIR ?? path.join(workspaceRoot, "..", "multimodal fraud detection");

    const scriptPath = path.join(backendRoot, "src", "fraud_gnn", "cli.py");
    const pythonCmd = process.env.FRAUD_BACKEND_PYTHON || "python";

    const child = spawn(pythonCmd, [scriptPath], {
      cwd: backendRoot,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (err) => {
      reject(new Error(`Failed to start python process: ${err.message}`));
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `Python process exited with code ${code}`));
        return;
      }
      resolve(stdout.trim());
    });

    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PredictPayload>;
    const payload: PredictPayload = {
      amount: Number(body.amount ?? 0),
      country: String(body.country ?? ""),
      device_type: String(body.device_type ?? ""),
      merchant_category: String(body.merchant_category ?? ""),
    };

    const output = await runPythonPredictor(payload);
    const parsed = JSON.parse(output) as Record<string, unknown>;

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Backend connection failed. Ensure Python is installed and backend script exists at ../multimodal fraud detection/src/fraud_gnn/cli.py",
        detail: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 },
    );
  }
}
