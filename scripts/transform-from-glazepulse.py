#!/usr/bin/env python3
"""Transform glazepulse codebase to bindpulse bookbinding workshop domain."""
import os
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BACKEND_RENAMES = {
    "pottery-studio": "bindery",
    "kilns": "presses",
    "firing-batches": "binding-jobs",
    "kiln-maintenance": "press-maintenance",
    "glaze-checklists": "finishing-checklists",
    "clay-orders": "material-orders",
    "firing-rates": "service-rates",
}

FRONTEND_PAGE_RENAMES = {
    "kilns": "presses",
    "firing-batches": "binding-jobs",
    "kiln-maintenance": "press-maintenance",
    "glaze-checklists": "finishing-checklists",
    "clay-orders": "material-orders",
    "firing-rates": "service-rates",
}

FILE_RENAMES = {
    "pottery-studio.controller.ts": "bindery.controller.ts",
    "pottery-studio.service.ts": "bindery.service.ts",
    "pottery-studio.module.ts": "bindery.module.ts",
    "update-pottery-studio.dto.ts": "update-bindery.dto.ts",
    "kilns.controller.ts": "presses.controller.ts",
    "kilns.service.ts": "presses.service.ts",
    "kilns.module.ts": "presses.module.ts",
    "kiln.dto.ts": "press.dto.ts",
    "firing-batches.controller.ts": "binding-jobs.controller.ts",
    "firing-batches.service.ts": "binding-jobs.service.ts",
    "firing-batches.module.ts": "binding-jobs.module.ts",
    "firing-batch.dto.ts": "binding-job.dto.ts",
    "kiln-maintenance.controller.ts": "press-maintenance.controller.ts",
    "kiln-maintenance.service.ts": "press-maintenance.service.ts",
    "kiln-maintenance.module.ts": "press-maintenance.module.ts",
    "kiln-maintenance.dto.ts": "press-maintenance.dto.ts",
    "glaze-checklists.controller.ts": "finishing-checklists.controller.ts",
    "glaze-checklists.service.ts": "finishing-checklists.service.ts",
    "glaze-checklists.module.ts": "finishing-checklists.module.ts",
    "glaze-checklist.dto.ts": "finishing-checklist.dto.ts",
    "clay-orders.controller.ts": "material-orders.controller.ts",
    "clay-orders.service.ts": "material-orders.service.ts",
    "clay-orders.module.ts": "material-orders.module.ts",
    "clay-order.dto.ts": "material-order.dto.ts",
    "firing-rates.controller.ts": "service-rates.controller.ts",
    "firing-rates.service.ts": "service-rates.service.ts",
    "firing-rates.module.ts": "service-rates.module.ts",
    "firing-rate.dto.ts": "service-rate.dto.ts",
    "side-rail.tsx": "bottom-dock.tsx",
}

REPLACEMENTS = [
    ("glazepulse-dev-secret", "bindpulse-dev-secret"),
    ("glazepulse123", "bindpulse123"),
    ("glazepulse", "bindpulse"),
    ("GlazePulse", "BindPulse"),
    ("potteryStudioName", "binderyName"),
    ("potteryStudioId", "binderyId"),
    ("potteryStudio", "bindery"),
    ("PotteryStudio", "Bindery"),
    ("pottery_studios", "binderies"),
    ("pottery_studio", "bindery"),
    ("totalKilns", "totalPresses"),
    ("total_kilns", "total_presses"),
    ("coneAdjustment", "rushFee"),
    ("cone_adjustment", "rush_fee"),
    ("dailyConeAdjustments", "dailyRushFees"),
    ("kilnModel", "pressModel"),
    ("kiln_model", "press_model"),
    ("KilnMaintenance", "PressMaintenance"),
    ("kilnMaintenance", "pressMaintenance"),
    ("kiln_maintenance", "press_maintenance"),
    ("kiln-maintenance", "press-maintenance"),
    ("openKilnMaintenance", "openPressMaintenance"),
    ("urgentKilnMaintenance", "urgentPressMaintenance"),
    ("recentKilnMaintenance", "recentPressMaintenance"),
    ("GlazeChecklist", "FinishingChecklist"),
    ("glazeChecklist", "finishingChecklist"),
    ("glazeChecklists", "finishingChecklists"),
    ("glaze_checklists", "finishing_checklists"),
    ("glaze-checklists", "finishing-checklists"),
    ("pendingGlazeChecklists", "pendingFinishingChecklists"),
    ("ClayOrder", "MaterialOrder"),
    ("clayOrder", "materialOrder"),
    ("clayOrders", "materialOrders"),
    ("clay_orders", "material_orders"),
    ("clay-orders", "material-orders"),
    ("pendingClayOrders", "pendingMaterialOrders"),
    ("completedClayOrders", "completedMaterialOrders"),
    ("clayBody", "materialType"),
    ("clay_body", "material_type"),
    ("FiringBatch", "BindingJob"),
    ("firingBatch", "bindingJob"),
    ("firingBatches", "bindingJobs"),
    ("firing_batches", "binding_jobs"),
    ("firing-batches", "binding-jobs"),
    ("firingType", "bindingType"),
    ("firing_type", "binding_type"),
    ("totalBatches", "totalJobs"),
    ("recentBatches", "recentJobs"),
    ("KilnType", "PressType"),
    ("KilnStatus", "PressStatus"),
    ("FiringType", "BindingType"),
    ("BatchStatus", "JobStatus"),
    ("GlazeCategory", "FinishingCategory"),
    ("GlazeStatus", "FinishingStatus"),
    ("FiringCategory", "ServiceCategory"),
    ("FiringRateStatus", "ServiceRateStatus"),
    ("ClayOrderStatus", "MaterialOrderStatus"),
    ("FiringRate", "ServiceRate"),
    ("firingRate", "serviceRate"),
    ("firingRates", "serviceRates"),
    ("firing_rates", "service_rates"),
    ("firing-rates", "service-rates"),
    ("KilnsService", "PressesService"),
    ("KilnsController", "PressesController"),
    ("KilnsModule", "PressesModule"),
    ("CreateKilnDto", "CreatePressDto"),
    ("UpdateKilnDto", "UpdatePressDto"),
    ("PotteryStudioService", "BinderyService"),
    ("PotteryStudioController", "BinderyController"),
    ("PotteryStudioModule", "BinderyModule"),
    ("UpdatePotteryStudioDto", "UpdateBinderyDto"),
    ("FiringBatchesService", "BindingJobsService"),
    ("FiringBatchesController", "BindingJobsController"),
    ("FiringBatchesModule", "BindingJobsModule"),
    ("CreateFiringBatchDto", "CreateBindingJobDto"),
    ("UpdateFiringBatchDto", "UpdateBindingJobDto"),
    ("KilnMaintenanceService", "PressMaintenanceService"),
    ("KilnMaintenanceController", "PressMaintenanceController"),
    ("KilnMaintenanceModule", "PressMaintenanceModule"),
    ("GlazeChecklistsService", "FinishingChecklistsService"),
    ("GlazeChecklistsController", "FinishingChecklistsController"),
    ("GlazeChecklistsModule", "FinishingChecklistsModule"),
    ("ClayOrdersService", "MaterialOrdersService"),
    ("ClayOrdersController", "MaterialOrdersController"),
    ("ClayOrdersModule", "MaterialOrdersModule"),
    ("FiringRatesService", "ServiceRatesService"),
    ("FiringRatesController", "ServiceRatesController"),
    ("FiringRatesModule", "ServiceRatesModule"),
    ("kilnUtilizationRate", "pressUtilizationRate"),
    ("studioZones", "binderyZones"),
    ("kilnCount", "pressCount"),
    ("availableKilns", "availablePresses"),
    ("firingKilns", "activePresses"),
    ("kilnId", "pressId"),
    ("kiln_id", "press_id"),
    ("Kiln", "Press"),
    ("kilns", "presses"),
    ("pottery-studio", "bindery"),
    ("@Controller('kilns')", "@Controller('presses')"),
    ("@Controller('firing-batches')", "@Controller('binding-jobs')"),
    ("@Controller('kiln-maintenance')", "@Controller('press-maintenance')"),
    ("@Controller('glaze-checklists')", "@Controller('finishing-checklists')"),
    ("@Controller('clay-orders')", "@Controller('material-orders')"),
    ("@Controller('firing-rates')", "@Controller('service-rates')"),
    ("@Controller('pottery-studio')", "@Controller('bindery')"),
    ("'/kilns", "'/presses"),
    ("'/firing-batches", "'/binding-jobs"),
    ("'/kiln-maintenance", "'/press-maintenance"),
    ("'/glaze-checklists", "'/finishing-checklists"),
    ("'/clay-orders", "'/material-orders"),
    ("'/firing-rates", "'/service-rates"),
    ("'/pottery-studio", "'/bindery"),
    ("api.kilns", "api.presses"),
    ("api.firingBatches", "api.bindingJobs"),
    ("api.kilnMaintenance", "api.pressMaintenance"),
    ("api.glazeChecklists", "api.finishingChecklists"),
    ("api.clayOrders", "api.materialOrders"),
    ("api.firingRates", "api.serviceRates"),
    ("api.potteryStudio", "api.bindery"),
    ("itemCount", "pageCount"),
    ("item_count", "page_count"),
    ("4018", "4019"),
    ("3018", "3019"),
    ("5458", "5459"),
    ("SideRail", "BottomDock"),
    ("side-rail", "bottom-dock"),
    ("kiln-card", "archive-card"),
    ("kiln-btn", "archive-btn"),
    ("kiln-pill", "archive-pill"),
    ("Claywheel Pottery Studio", "Heritage Bindery & Conservation"),
    ("demo@claywheelstudio.com", "demo@heritagebindery.com"),
    ("claywheelstudio", "heritagebindery"),
    ("potter", "binder"),
    ("Fraunces", "EB Garamond"),
    ("Source Sans 3", "Libre Baskerville"),
    ("font-fraunces", "font-eb-garamond"),
    ("font-source", "font-libre"),
    ("--font-fraunces", "--font-eb-garamond"),
    ("--font-source", "--font-libre"),
    ("Seramik Atölyesi Fırın Yönetimi", "Cilt Atölyesi Operasyon Yönetimi"),
    ("Seramik atölyesi", "Cilt atölyesi"),
    ("seramik atölyesi", "cilt atölyesi"),
    ("Fırınlar", "Presler"),
    ("Pişirimler", "Cilt İşleri"),
    ("Sırlar", "Bitirme"),
    ("Kil Siparişleri", "Malzeme Siparişleri"),
    ("Tarifeler", "Hizmet Tarifeleri"),
    ("Atölye", "Cilt Atölyesi"),
]

SKIP_DIRS = {".git", "node_modules", "dist", ".next", "coverage"}


def should_process(path: Path) -> bool:
    if any(part in SKIP_DIRS for part in path.parts):
        return False
    return path.suffix in {
        ".ts", ".tsx", ".js", ".json", ".md", ".yml", ".yaml", ".sh",
        ".css", ".prisma", ".example", ".toml", ".txt", ".py",
    } or path.name in {".gitignore", "Dockerfile", "README.md"}


def replace_in_file(path: Path) -> None:
    if "transform-from-glazepulse.py" in str(path):
        return
    try:
        content = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, IsADirectoryError):
        return
    original = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    if content != original:
        path.write_text(content, encoding="utf-8")


def rename_backend_dirs() -> None:
    backend_src = ROOT / "backend" / "src"
    for old, new in BACKEND_RENAMES.items():
        old_path = backend_src / old
        new_path = backend_src / new
        if old_path.exists():
            if new_path.exists():
                shutil.rmtree(new_path)
            old_path.rename(new_path)


def rename_frontend_pages() -> None:
    app_dir = ROOT / "frontend" / "src" / "app"
    for old, new in FRONTEND_PAGE_RENAMES.items():
        old_path = app_dir / old
        new_path = app_dir / new
        if old_path.exists():
            if new_path.exists():
                shutil.rmtree(new_path)
            old_path.rename(new_path)


def rename_files() -> None:
    for dirpath, _, filenames in os.walk(ROOT):
        if any(s in dirpath for s in SKIP_DIRS):
            continue
        for filename in filenames:
            if filename in FILE_RENAMES:
                old = Path(dirpath) / filename
                new = Path(dirpath) / FILE_RENAMES[filename]
                if new.exists():
                    new.unlink()
                old.rename(new)


def process_all_files() -> None:
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in filenames:
            path = Path(dirpath) / filename
            if should_process(path):
                replace_in_file(path)


def main() -> None:
    rename_backend_dirs()
    rename_frontend_pages()
    rename_files()
    process_all_files()
    (ROOT / ".active-project").write_text("bindpulse\n", encoding="utf-8")
    print("BindPulse transform complete.")


if __name__ == "__main__":
    main()
